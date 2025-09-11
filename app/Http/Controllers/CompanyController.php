<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function index()
    {
        $this->authorizeAdmin();

        $company = Company::first(); // biasanya cuma 1 perusahaan
        return inertia('Company/Index', [
            'company' => $company,
        ]);
    }

    public function edit()
    {
        $this->authorizeAdmin();

        $company = Company::first();
        return inertia('Company/Edit', [
            'company' => $company,
        ]);
    }

    public function update(Request $request)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'address'       => 'nullable|string',
            'phone'         => 'nullable|string|max:20',
            'email'         => 'nullable|email|max:255',
            'logo_path'     => 'nullable|file|image|max:2048',
            'signature_path'=> 'nullable|file|image|max:2048',
        ]);

        $company = Company::firstOrNew();

        if ($request->hasFile('logo_path')) {
            $validated['logo_path'] = $request->file('logo_path')->store('logos', 'public');
        }
        if ($request->hasFile('signature_path')) {
            $validated['signature_path'] = $request->file('signature_path')->store('signatures', 'public');
        }

        $company->fill($validated)->save();

        return redirect()->route('company.index')->with('success', 'Data perusahaan berhasil diperbarui');
    }

    private function authorizeAdmin()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Hanya admin yang boleh mengelola perusahaan.');
        }
    }
}
