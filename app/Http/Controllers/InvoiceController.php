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

        // ✅ Simpan file tanda tangan ke storage/public/signatures
        if ($request->hasFile('signature_path')) {
            $validated['signature_path'] = $request->file('signature_path')
                ->store('signatures', 'public');
        }

        return DB::transaction(function () use ($validated) {
            $invoice = $this->saveInvoiceData($validated);

            // kurangi stok hanya kalau status printed/sent
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

    public function edit(Invoice $invoice)
    {
        $this->authorizeFinance();

        return inertia('Invoices/Edit', [
            'invoice'   => $invoice->load('items.product'),
            'company'   => Company::first(),
            'customers' => Customer::all(),
            'products'  => Product::with('prices')->get(),
        ]);
    }


    public function update(Request $request, Invoice $invoice)
    {
        $this->authorizeFinance();

        // 🛠 decode dulu kalau items masih string
        if ($request->has('items') && is_string($request->items)) {
            $request->merge([
                'items' => json_decode($request->items, true)
            ]);
        }

        $validated = $this->validateInvoice($request, $invoice->id);

        // ✅ Simpan file tanda tangan baru
        if ($request->hasFile('signature_path')) {
            $validated['signature_path'] = $request->file('signature_path')
                ->store('signatures', 'public');
        }

        return DB::transaction(function () use ($validated, $invoice) {
            $this->updateInvoiceData($invoice, $validated);
            $this->adjustStockOnStatus($invoice);

            return redirect()
                ->route('invoices.show', $invoice->id)
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
                        $multiplier = $item->unit_multiplier ?? 1;
                        $realQty = $item->quantity * $multiplier;
                        $product->stocks()->decrement('quantity_pcs', $realQty);
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
            'keterangan' => 'nullable|string',
            'terms' => 'nullable|string',
            'discount_total' => 'nullable|numeric',
            'extra_discount' => 'nullable|numeric',
            'shipping_cost'  => 'nullable|numeric',
            'tax_total'      => 'nullable|numeric',
            'items'         => 'required|array|min:1',
            'items.*.product_id'   => 'required|exists:products,id',
            'items.*.quantity'     => 'required|numeric|min:1',
            'items.*.unit'         => 'nullable|string',
            'items.*.discount_type' => 'nullable|in:percent,amount',
            'items.*.discount'     => 'nullable|numeric|min:0',
            'items.*.tax'          => 'nullable|numeric|min:0',
            'custom_labels'        => 'nullable|array',
            'logo_path'            => 'nullable|string',
            'signature_path' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',

            // status tidak wajib → default draft
            'status'               => 'nullable|in:draft,printed,sent',
        ]);
    }

    private function saveInvoiceData($validated)
    {
        $subtotal = 0;
        $itemsData = [];

        foreach ($validated['items'] as $item) {
            $product = Product::with('prices')->find($item['product_id']);
            $price = $product?->prices()->first()?->price ?? 0;

            // hitung harga kotor (qty * harga satuan)
            $lineBase = $item['quantity'] * $price;

            // ✅ hitung diskon sesuai type
            $discount = 0;
            if (($item['discount_type'] ?? 'amount') === 'percent') {
                $discount = $lineBase * ($item['discount'] ?? 0) / 100;
            } else {
                $discount = $item['discount'] ?? 0;
            }

            // ✅ hitung setelah diskon
            $afterDiscount = $lineBase - $discount;

            // ✅ hitung pajak (anggap %)
            $tax = ($afterDiscount * ($item['tax'] ?? 0)) / 100;

            // ✅ total akhir per baris
            $lineTotal = $afterDiscount + $tax;

            $subtotal += $lineTotal;

            $itemsData[] = [
                'product_id'    => $item['product_id'],
                'description'   => $item['description'] ?? $product->name,
                'quantity'      => $item['quantity'],
                'unit'          => $item['unit'] ?? $product->unit_default ?? '-',
                'price'         => $price,
                'discount'      => $item['discount'] ?? 0,
                'discount_type' => $item['discount_type'] ?? 'amount',
                'tax'           => $item['tax'] ?? 0,
                'total'         => $lineTotal,
            ];
        }


        $invoice = Invoice::create($this->extractInvoiceFields($validated, $subtotal));

        foreach ($itemsData as $data) {
            InvoiceItem::create(array_merge($data, ['invoice_id' => $invoice->id]));
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
            'keterangan'     => $validated['keterangan'] ?? null,
            'terms'          => $validated['terms'] ?? null,
            'discount_total' => (float)($validated['discount_total'] ?? 0),
            'extra_discount' => (float)($validated['extra_discount'] ?? 0),
            'shipping_cost'  => (float)($validated['shipping_cost'] ?? 0),
            'tax_total'      => (float)($validated['tax_total'] ?? 0),
            'grand_total'    => $subtotal
                - ($validated['discount_total'] ?? 0)
                - ($validated['extra_discount'] ?? 0)
                + ($validated['shipping_cost'] ?? 0)
                + ($validated['tax_total'] ?? 0),
            'custom_labels'  => $validated['custom_labels'] ?? null,
            'logo_path'      => $validated['logo_path'] ?? null,
            'signature_path' => $validated['signature_path'] ?? null,
            'status'         => $validated['status'] ?? 'draft',
        ];
    }

    private function updateInvoiceData(Invoice $invoice, $validated)
    {
        $subtotal = 0;
        $itemsData = [];

        foreach ($validated['items'] as $item) {
            $product = Product::with('prices')->find($item['product_id']);
            $price = $product?->prices()->first()?->price ?? 0;

            // hitung harga kotor (qty * harga satuan)
            $lineBase = $item['quantity'] * $price;

            // ✅ hitung diskon sesuai type
            $discount = 0;
            if (($item['discount_type'] ?? 'amount') === 'percent') {
                $discount = $lineBase * ($item['discount'] ?? 0) / 100;
            } else {
                $discount = $item['discount'] ?? 0;
            }

            // ✅ hitung setelah diskon
            $afterDiscount = $lineBase - $discount;

            // ✅ hitung pajak (anggap %)
            $tax = ($afterDiscount * ($item['tax'] ?? 0)) / 100;

            // ✅ total akhir per baris
            $lineTotal = $afterDiscount + $tax;

            $subtotal += $lineTotal;

            $itemsData[] = [
                'product_id'    => $item['product_id'],
                'description'   => $item['description'] ?? $product->name,
                'quantity'      => $item['quantity'],
                'unit'          => $item['unit'] ?? $product->unit_default ?? '-',
                'price'         => $price,
                'discount'      => $item['discount'] ?? 0,
                'discount_type' => $item['discount_type'] ?? 'amount',
                'tax'           => $item['tax'] ?? 0,
                'total'         => $lineTotal,
            ];
        }


        // update invoice header
        $invoice->update($this->extractInvoiceFields($validated, $subtotal));

        // replace items
        $invoice->items()->delete();
        foreach ($itemsData as $data) {
            InvoiceItem::create(array_merge($data, ['invoice_id' => $invoice->id]));
        }

        return $invoice;
    }
}
