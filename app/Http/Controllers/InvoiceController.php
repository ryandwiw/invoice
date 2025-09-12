<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */

        $user = Auth::user();

        if ($user->isFinance()) {
            $invoices = Invoice::with('customer', 'user', 'company')
                ->where('user_id', $user->id)
                ->latest()
                ->paginate(15);
        } else {
            $this->authorizeAdmin();
            $invoices = Invoice::with('customer', 'user', 'company')
                ->latest()
                ->paginate(15);
        }

        return inertia('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function create()
    {
        $this->authorizeFinance();

        return inertia('Invoices/Create', [
            'company'   => Company::first(),
            'customers' => Customer::all(),
            'products'  => Product::with('prices')->get(),
        ]);
    }

    public function preview(Request $request)
    {
        $this->authorizeFinance();

        return response()->json([
            'success' => true,
            'preview' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeFinance();

        $validated = $this->validateInvoice($request);

        return DB::transaction(function () use ($validated) {
            $invoice = $this->saveInvoiceData($validated);

            // hanya kurangi stok kalau status bukan draft
            $this->adjustStockOnStatus($invoice);

            return redirect()->route('invoices.show', $invoice->id)
                ->with('success', 'Invoice berhasil dibuat!');
        });
    }


    public function show(Invoice $invoice)
    {
        $invoice->load('items.product', 'customer', 'user', 'company');

        return inertia('Invoices/Show', [
            'invoice' => $invoice,
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $this->authorizeFinance();

        $validated = $this->validateInvoice($request, $invoice->id);

        return DB::transaction(function () use ($validated, $invoice) {
            $invoice->items()->delete();

            $invoice->update($this->extractInvoiceFields($validated));

            foreach ($validated['items'] as $item) {
                InvoiceItem::create([
                    'invoice_id'  => $invoice->id,
                    'product_id'  => $item['product_id'] ?? null,
                    'description' => $item['description'],
                    'quantity'    => $item['quantity'],
                    'unit'        => $item['unit'],
                    'price'       => $item['price'],
                    'discount'    => $item['discount'] ?? 0,
                    'tax'         => $item['tax'] ?? 0,
                    'total'       => ($item['quantity'] * $item['price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0),
                ]);
            }

            // hanya kurangi stok kalau status bukan draft
            $this->adjustStockOnStatus($invoice);

            return redirect()->route('invoices.show', $invoice->id)
                ->with('success', 'Invoice berhasil diperbarui!');
        });
    }


    public function destroy(Invoice $invoice)
    {
        $this->authorizeFinance();

        $invoice->delete();

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice berhasil dihapus!');
    }

    public function print(Invoice $invoice)
    {
        $invoice->load('items.product', 'customer', 'user', 'company');

        return inertia('Invoices/Print', [
            'invoice' => $invoice,
        ]);
    }

    private function adjustStockOnStatus(Invoice $invoice)
    {
        if (in_array($invoice->status, ['printed', 'sent'])) {
            foreach ($invoice->items as $item) {
                if (!empty($item->product_id)) {
                    $product = $item->product;
                    if ($product && $product->stocks()->exists()) {
                        $product->stocks()->decrement('quantity_pcs', $item->quantity);
                    }
                }
            }
        }
    }

    private function authorizeFinance()
    {
        /** @var \App\Models\User $user */

        $user = Auth::user();

        if (!$user || !$user->isFinance()) {
            abort(403, 'Hanya Finance (sales) yang boleh melakukan aksi ini.');
        }
    }

    private function authorizeAdmin()
    {
        /** @var \App\Models\User $user */

        $user = Auth::user();

        if (!$user || !$user->isAdmin()) {
            abort(403, 'Hanya Admin yang boleh melakukan aksi ini.');
        }
    }

    private function validateInvoice(Request $request, $ignoreId = null)
    {
        return $request->validate([
            'company_id'    => 'required|exists:companies,id',
            'customer_id'   => 'required|exists:customers,id',
            'invoice_no'    => 'required|string|unique:invoices,invoice_no,' . $ignoreId,
            'invoice_date'  => 'required|date',
            'due_date'      => 'nullable|date',
            'currency'      => 'required|string|max:10',
            'items'         => 'required|array|min:1',
            'items.*.product_id'   => 'nullable|exists:products,id',
            'items.*.description'  => 'required|string',
            'items.*.quantity'     => 'required|numeric|min:1',
            'items.*.unit'         => 'required|string',
            'items.*.price'        => 'required|numeric|min:0',
            'items.*.discount'     => 'nullable|numeric|min:0',
            'items.*.tax'          => 'nullable|numeric|min:0',
            'custom_labels'        => 'nullable|array',
            'logo_path'            => 'nullable|string',
            'signature_path'       => 'nullable|string',
            'status'               => 'required|in:draft,printed,sent',
        ]);
    }

    private function saveInvoiceData($validated)
    {
        $subtotal = 0;
        foreach ($validated['items'] as $item) {
            $lineTotal = ($item['quantity'] * $item['price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0);
            $subtotal += $lineTotal;
        }

        $invoice = Invoice::create($this->extractInvoiceFields($validated, $subtotal));

        foreach ($validated['items'] as $item) {
            InvoiceItem::create([
                'invoice_id'  => $invoice->id,
                'product_id'  => $item['product_id'] ?? null,
                'description' => $item['description'],
                'quantity'    => $item['quantity'],
                'unit'        => $item['unit'],
                'price'       => $item['price'],
                'discount'    => $item['discount'] ?? 0,
                'tax'         => $item['tax'] ?? 0,
                'total'       => ($item['quantity'] * $item['price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0),
            ]);
        }

        return $invoice;
    }

    private function extractInvoiceFields($validated, $subtotal = null)
    {
        $subtotal = $subtotal ?? 0;

        return [
            'company_id'     => $validated['company_id'],
            'user_id'        => Auth::id(),
            'customer_id'    => $validated['customer_id'],
            'invoice_no'     => $validated['invoice_no'],
            'ref_no'         => $validated['ref_no'] ?? null,
            'invoice_date'   => $validated['invoice_date'],
            'due_date'       => $validated['due_date'] ?? null,
            'currency'       => $validated['currency'],
            'subtotal'       => $subtotal,
            'discount_total' => $validated['discount_total'] ?? 0,
            'extra_discount' => $validated['extra_discount'] ?? 0,
            'shipping_cost'  => $validated['shipping_cost'] ?? 0,
            'tax_total'      => $validated['tax_total'] ?? 0,
            'grand_total'    => $subtotal
                - ($validated['discount_total'] ?? 0)
                - ($validated['extra_discount'] ?? 0)
                + ($validated['shipping_cost'] ?? 0)
                + ($validated['tax_total'] ?? 0),
            'custom_labels'  => $validated['custom_labels'] ?? null,
            'logo_path'      => $validated['logo_path'] ?? null,
            'signature_path' => $validated['signature_path'] ?? null,
            'status'         => $validated['status'],
        ];
    }
}
