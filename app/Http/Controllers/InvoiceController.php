<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Invoice::query()->latest();
        if ($user->isFinance()) $query->where('user_id', $user->id);

        return Inertia::render('invoices/index', [
            'invoices' => $query->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('invoices/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validateInvoice($request);
        // dd($data);
        $companyInfo = [
            'company_name' => 'Soil Agriculture Indonesia',
            'company_address' => 'Jalan Tegal Mapan No. 18, Kecamatan Pakis, Kab. Malang, Jawa Timur, 65154 Indonesia',
            'company_phone'  => '+62 813-3570-7170',
            'company_email'  => 'soilagri.ind@gmail.com',
        ];

        Invoice::create(array_merge($companyInfo, $data, [
            'user_id' => $request->user()->id,
            'status' => 'draft',
        ]));

        return redirect()->route('invoices.index')->with('success', 'Invoice berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice, Request $request)
    {
        $this->authorizeInvoice($invoice, $request->user());
        return Inertia::render('invoices/show', ['invoice' => $invoice]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice, Request $request)
    {
        $this->authorizeInvoice($invoice, $request->user());
        return Inertia::render('invoices/edit', ['invoice' => $invoice]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Invoice $invoice, Request $request)
    {
        $this->authorizeInvoice($invoice, $request->user());
        $data = $this->validateInvoice($request);
        $invoice->update($data);

        return redirect()->route('invoices.show', $invoice->id)
            ->with('success', 'Invoice berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice, Request $request)
    {
        $this->authorizeInvoice($invoice, $request->user());
        $invoice->delete();

        return redirect()->route('invoices.index')->with('success', 'Invoice berhasil dihapus!');
    }

    private function validateInvoice(Request $request)
    {
        return $request->validate([
            'company_profile_tujuan' => 'required|string',
            'company_address_tujuan' => 'nullable|string',
            'company_phone_tujuan' => 'nullable|regex:/^\d+$/',
            'company_email_tujuan' => 'nullable|email',
            'referensi' => 'nullable|string',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.qty' => 'required|numeric|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric',
            'total' => 'required|numeric',
        ], [
            'company_profile_tujuan.required' => 'Nama client harus diisi.',
            'company_profile_tujuan.string' => 'Nama client harus berupa teks.',
            'company_phone_tujuan.regex' => 'Telepon hanya boleh berisi angka.',
            'company_email_tujuan.email' => 'Email tidak valid.',
            'items.*.name.required' => 'Nama item harus diisi.',
            'items.*.qty.min' => 'Qty minimal 1.',
            'items.*.price.min' => 'Harga minimal 0.',
            'subtotal.required' => 'Subtotal harus dihitung.',
            'total.required' => 'Total harus dihitung.',
        ]);
    }

    private function authorizeInvoice(Invoice $invoice, $user)
    {
        if ($user->isFinance() && $invoice->user_id !== $user->id) abort(403);
    }
}
