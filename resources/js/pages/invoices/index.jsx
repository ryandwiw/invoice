import React from 'react'
import { Link, usePage, Head } from '@inertiajs/react'
import ModernDashboardLayout from "@/layouts/DashboardLayout";


export default function Index() {
    const { invoices } = usePage().props

    const formatCurrency = (value, currency = invoices?.data?.[0]?.currency || 'IDR') => {
        if (value == null) return '-'
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency }).format(value)
    }

    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Daftar Invoice</h1>
                    <Link href={route('invoices.create')} className="btn btn-primary">
                        Buat Invoice
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg shadow bg-base-100">
                    <table className="table w-full table-compact">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No Invoice</th>
                                <th>Customer</th>
                                <th>Tanggal</th>
                                <th className="text-right">Total</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.data && invoices.data.length ? (
                                invoices.data.map((inv, idx) => (
                                    <tr key={inv.id} className="hover">
                                        <th>{invoices.from + idx}</th>
                                        <td>{inv.invoice_no}</td>
                                        <td>{inv.customer?.name ?? '-'}</td>
                                        <td>{inv.invoice_date}</td>
                                        <td className="text-right">{formatCurrency(inv.grand_total, inv.currency)}</td>
                                        <td>
                                            <span
                                                className={`badge ${inv.status === 'draft'
                                                        ? 'badge-outline'
                                                        : inv.status === 'printed'
                                                            ? 'badge-success'
                                                            : 'badge-info'
                                                    }`}
                                            >
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link href={route('invoices.show', inv.id)} className="btn btn-sm btn-ghost">
                                                    Lihat
                                                </Link>
                                                <Link href={route('invoices.edit', inv.id)} className="btn btn-sm btn-outline">
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-6 text-center">
                                        Belum ada invoice.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {invoices.links && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                            Menampilkan {invoices.from} - {invoices.to} dari {invoices.total}
                        </div>
                        <div className="btn-group">
                            {invoices.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    as={link.url ? undefined : 'button'}
                                    className={`btn btn-sm ${link.active ? 'btn-primary' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ModernDashboardLayout >

    )
}
