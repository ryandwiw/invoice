<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function index()
    {
        $this->authorizeFinance();

        $customers = Customer::paginate(20);

        return inertia('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        $this->authorizeFinance();

        return inertia('Customers/Create');
    }

    public function store(Request $request)
    {
        $this->authorizeFinance();

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'phone'          => 'nullable|string|max:20',
            'email'          => 'nullable|email|max:255',
            'address'        => 'nullable|string',
            'contact_person' => 'nullable|string|max:255',
        ]);

        Customer::create($validated);

        return redirect()->route('customers.index')
            ->with('success', 'Customer berhasil ditambahkan');
    }

    public function edit(Customer $customer)
    {
        $this->authorizeFinance();

        return inertia('Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $this->authorizeFinance();

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'phone'          => 'nullable|string|max:20',
            'email'          => 'nullable|email|max:255',
            'address'        => 'nullable|string',
            'contact_person' => 'nullable|string|max:255',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')
            ->with('success', 'Customer berhasil diperbarui');
    }

    public function show(Customer $customer)
    {
        $this->authorizeFinance();

        return inertia('Customers/Show', [
            'customer' => $customer,
        ]);
    }


    public function destroy(Customer $customer)
    {
        $this->authorizeFinance();

        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer berhasil dihapus');
    }

    private function authorizeFinance()
    {
        /** @var \App\Models\User $user */

        $user = Auth::user();

        if (!$user || !$user->isFinance()) {
            abort(403, 'Hanya finance (sales) yang boleh mengelola customer.');
        }
    }
}
