import React, { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Edit({ invoice }) {

    const formatDateForInput = (date) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const { data, setData, put, processing, errors } = useForm({
        company_profile_tujuan: invoice.company_profile_tujuan || '',
        company_address_tujuan: invoice.company_address_tujuan || '',
        company_phone_tujuan: invoice.company_phone_tujuan || '',
        company_email_tujuan: invoice.company_email_tujuan || '',
        referensi: invoice.referensi || '',
        invoice_date: formatDateForInput(invoice.invoice_date),
        due_date: formatDateForInput(invoice.due_date),
        items: invoice.items || [{ name: '', qty: 1, price: 0 }],
        subtotal: invoice.subtotal || 0,
        total: invoice.total || 0,
    });


    // Format Rupiah
    const formatRupiah = (value) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    // Hitung subtotal & total tiap data.items berubah
    useEffect(() => {
        const newSubtotal = data.items.reduce((sum, i) => sum + i.qty * i.price, 0);
        setData('subtotal', newSubtotal);
        setData('total', newSubtotal);
    }, [data.items]);

    const addItem = () =>
        setData('items', [...data.items, { name: '', qty: 1, price: 0 }]);

    const removeItem = (idx) => {
        const newItems = data.items.filter((_, i) => i !== idx);
        setData('items', newItems.length ? newItems : [{ name: '', qty: 1, price: 0 }]);
    };

    const updateItem = (idx, field, value) => {
        const copy = [...data.items];
        if (field === 'qty') {
            copy[idx][field] = Math.max(1, parseInt(value) || 1);
        } else if (field === 'price') {
            const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
            copy[idx][field] = numericValue;
        } else {
            copy[idx][field] = value;
        }
        setData('items', copy);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('invoices.update', invoice.id));
    };

    // Validasi frontend
    const isPhoneValid = (phone) => /^((0)|(62))\d*$/.test(phone) || phone === '';
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '';

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Invoice</h1>

            <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                {/* Nama Client */}
                <div className="space-y-2">
                    <label className="block font-semibold">Nama Client</label>
                    <input
                        className="border p-2 w-full rounded"
                        value={data.company_profile_tujuan}
                        onChange={(e) => setData('company_profile_tujuan', e.target.value)}
                    />
                    {errors.company_profile_tujuan && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.company_profile_tujuan}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                    <label className="block font-semibold">Alamat Client</label>
                    <input
                        className="border p-2 w-full rounded"
                        value={data.company_address_tujuan}
                        onChange={(e) => setData('company_address_tujuan', e.target.value)}
                    />
                    {errors.company_address_tujuan && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.company_address_tujuan}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Telepon */}
                <div className="space-y-2">
                    <label className="block font-semibold">Telepon Client</label>
                    <input
                        className={`border p-2 w-full rounded ${!isPhoneValid(data.company_phone_tujuan) ? 'border-red-500' : ''}`}
                        type="text"
                        value={data.company_phone_tujuan}
                        onChange={(e) => setData('company_phone_tujuan', e.target.value)}
                    />
                    {!isPhoneValid(data.company_phone_tujuan) && (
                        <Alert variant="destructive">
                            <AlertDescription>Telepon harus diawali 0 atau 62 dan hanya berisi angka.</AlertDescription>
                        </Alert>
                    )}
                    {errors.company_phone_tujuan && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.company_phone_tujuan}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block font-semibold">Email Client</label>
                    <input
                        className={`border p-2 w-full rounded ${!isEmailValid(data.company_email_tujuan) ? 'border-red-500' : ''}`}
                        type="email"
                        value={data.company_email_tujuan}
                        onChange={(e) => setData('company_email_tujuan', e.target.value)}
                    />
                    {!isEmailValid(data.company_email_tujuan) && (
                        <Alert variant="destructive">
                            <AlertDescription>Email tidak valid</AlertDescription>
                        </Alert>
                    )}
                    {errors.company_email_tujuan && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.company_email_tujuan}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Tanggal */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block font-semibold">Tanggal Invoice</label>
                        <input
                            type="date"
                            className="border p-2 w-full rounded"
                            value={data.invoice_date}
                            onChange={(e) => setData('invoice_date', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block font-semibold">Jatuh Tempo</label>
                        <input
                            type="date"
                            className="border p-2 w-full rounded"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                        />
                    </div>
                </div>

                {/* Referensi */}
                <div className="space-y-2">
                    <label className="block font-semibold">Referensi</label>
                    <input
                        className="border p-2 w-full rounded"
                        value={data.referensi}
                        onChange={(e) => setData('referensi', e.target.value)}
                    />
                </div>

                {/* Items */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Items</h3>
                    {data.items.map((it, idx) => (
                        <div key={idx} className="flex gap-2 items-center mb-2">
                            <input
                                className="border p-2 flex-1 rounded"
                                value={it.name}
                                onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            />
                            <input
                                className="border p-2 w-20 rounded"
                                type="number"
                                value={it.qty}
                                onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                            />
                            <input
                                className="border p-2 w-28 rounded"
                                type="text"
                                value={formatRupiah(it.price)}
                                onChange={(e) => updateItem(idx, 'price', e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => removeItem(idx)}
                            >
                                ❌
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                        onClick={addItem}
                    >
                        + Tambah Item
                    </button>
                </div>

                {/* Subtotal & Total */}
                <div className="mt-4">
                    <div className="font-semibold text-lg">Subtotal: {formatRupiah(data.subtotal)}</div>
                    <div className="font-semibold text-lg">Total: {formatRupiah(data.total)}</div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                    <Link
                        href={route('invoices.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Kembali
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
