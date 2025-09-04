import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Helper format rupiah
const formatRupiah = (angka) => {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
};

const breadcrumbs = [
  {
    title: 'test',
    href: '/invoices',
  },
];

// Badge status
const StatusBadge = ({ status }) => {
    let color = "bg-gray-200 text-gray-700";
    if (status === "Lunas") color = "bg-green-100 text-green-700";
    else if (status === "Pending") color = "bg-yellow-100 text-yellow-700";
    else if (status === "Overdue") color = "bg-red-100 text-red-700";

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
            {status}
        </span>
    );
};

export default function Index() {
    const { invoices } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus invoice ini?")) {
            router.delete(route("invoices.destroy", id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices Index" />
            <div className="p-6 max-w-6xl mx-auto dark:text-black">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold dark:text-white">Daftar Invoice</h1>
                    <Link
                        href={route("invoices.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Buat Invoice
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">Client</th>
                                <th className="px-4 py-3 border-b">Total</th>
                                <th className="px-4 py-3 border-b">Status</th>
                                <th className="px-4 py-3 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.data.length > 0 ? (
                                invoices.data.map((inv) => (
                                    <tr
                                        key={inv.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-2 border-b">{inv.id}</td>
                                        <td className="px-4 py-2 border-b">
                                            {inv.company_profile_tujuan}
                                        </td>
                                        <td className="px-4 py-2 border-b font-semibold text-gray-700">
                                            {formatRupiah(inv.total)}
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <StatusBadge status={inv.status} />
                                        </td>
                                        <td className="px-4 py-2 border-b space-x-3">
                                            <Link
                                                href={route("invoices.show", inv.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Detail
                                            </Link>
                                            <Link
                                                href={route("invoices.edit", inv.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(inv.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        Belum ada invoice
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
