<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * List semua invoice
     */
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
            $invoices = Invoice::with('customer', 'user', 'company')
                ->latest()
                ->paginate(15);
        }

        return inertia('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Form create invoice (finance only)
     */
    public function create()
    {
        $this->authorizeFinance();

        return inertia('Invoices/Create', [
            'customers' => Customer::all(),
            'products'  => Product::with('prices')->get(),
        ]);
    }

    /**
     * Preview invoice sebelum simpan (finance only)
     */
    public function preview(Request $request)
    {
        $this->authorizeFinance();

        $data = $request->validate([
            'customer_id'   => 'required|exists:customers,id',
            'invoice_no'    => 'required|string',
            'invoice_date'  => 'required|date',
            'due_date'      => 'nullable|date',
            'currency'      => 'required|string|max:10',
            'items'         => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity'    => 'required|numeric|min:1',
            'items.*.unit'        => 'required|string',
            'items.*.price'       => 'required|numeric|min:0',
            'items.*.discount'    => 'nullable|numeric|min:0',
            'items.*.tax'         => 'nullable|numeric|min:0',
        ]);

        // hitung total sementara
        $subtotal = 0;
        foreach ($data['items'] as $item) {
            $lineTotal = ($item['quantity'] * $item['price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0);
            $subtotal += $lineTotal;
        }

        $grandTotal = $subtotal
            - ($data['discount_total'] ?? 0)
            - ($data['extra_discount'] ?? 0)
            + ($data['shipping_cost'] ?? 0)
            + ($data['tax_total'] ?? 0);

        return response()->json([
            'success' => true,
            'preview' => [
                'invoice_no'   => $data['invoice_no'],
                'customer'     => Customer::find($data['customer_id']),
                'items'        => $data['items'],
                'subtotal'     => $subtotal,
                'grand_total'  => $grandTotal,
                'currency'     => $data['currency'],
                'invoice_date' => $data['invoice_date'],
                'due_date'     => $data['due_date'] ?? null,
            ],
        ]);
    }

    /**
     * Store invoice baru (finance only)
     */
    public function store(Request $request)
    {
        $this->authorizeFinance();

        $validated = $request->validate([
            'customer_id'   => 'required|exists:customers,id',
            'invoice_no'    => 'required|string|unique:invoices,invoice_no',
            'invoice_date'  => 'required|date',
            'due_date'      => 'nullable|date',
            'currency'      => 'required|string|max:10',
            'items'         => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.description' => 'required|string',
            'items.*.quantity'    => 'required|numeric|min:1',
            'items.*.unit'        => 'required|string',
            'items.*.price'       => 'required|numeric|min:0',
            'items.*.discount'    => 'nullable|numeric|min:0',
            'items.*.tax'         => 'nullable|numeric|min:0',
            'custom_labels'       => 'nullable|array',
            'signature_path'      => 'nullable|file|mimes:png,jpg,jpeg',
            'status'              => 'required|in:draft,printed,sent,paid,cancelled',
        ]);

        if ($request->hasFile('signature_path')) {
            $validated['signature_path'] = $request->file('signature_path')->store('signatures', 'public');
        }

        return DB::transaction(function () use ($validated) {
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $lineTotal = ($item['quantity'] * $item['price']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0);
                $subtotal += $lineTotal;
            }

            $invoice = Invoice::create([
                'company_id'     => Auth::user()->company_id ?? 1,
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
                'signature_path' => $validated['signature_path'] ?? null,
                'status'         => $validated['status'],
            ]);

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

                if ($invoice->status === 'paid' && isset($item['product_id'])) {
                    $product = Product::find($item['product_id']);
                    if ($product) {
                        $deductQty = $item['unit'] === 'carton'
                            ? $item['quantity'] * $product->pieces_per_carton
                            : $item['quantity'];
                        $product->stocks()->decrement('quantity_pcs', $deductQty);
                    }
                }
            }

            return redirect()->route('invoices.show', $invoice->id)
                ->with('success', 'Invoice berhasil dibuat!');
        });
    }

    /**
     * Show detail invoice
     */
    public function show(Invoice $invoice)
    {
        $invoice->load('items.product', 'customer', 'user', 'company');

        return inertia('Invoices/Show', [
            'invoice' => $invoice,
        ]);
    }

    /**
     * Cetak invoice
     */
    public function print(Invoice $invoice)
    {
        $invoice->load('items.product', 'customer', 'user', 'company');

        return inertia('Invoices/Print', [
            'invoice' => $invoice,
        ]);
    }

    /**
     * Helper untuk role finance
     */
    private function authorizeFinance()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isFinance()) {
            abort(403, 'Hanya Finance (sales) yang boleh melakukan aksi ini.');
        }
    }
}
