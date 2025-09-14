"use client";
import React from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FileText, Users, Pencil } from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Show() {
    const { invoice, company, customer } = usePage().props;

    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus invoice ini?")) {
            router.delete(route("invoices.destroy", invoice.id), {
                onSuccess: () => alert("Invoice berhasil dihapus!"),
                onError: () => alert("Gagal menghapus invoice."),
            });
        }
    };

    // Helper format Rupiah
    const formatRupiah = (number) => {
        if (!number) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    // Helper format angka bulat tanpa desimal (Qty, Pajak, Diskon persen)
    const formatInteger = (number) => {
        if (number == null) return 0;
        return Math.round(number).toLocaleString("id-ID");
    };

    return (
        <ModernDashboardLayout>
            <Head title={`Invoice #${invoice.invoice_no}`} />

            <div className="max-w-6xl mx-auto p-3">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-purple-400 hover:shadow-purple-400/40 transition-all p-6 space-y-4"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <FileText className="w-7 h-7 text-purple-500" />
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                                Detail Invoice #{invoice.invoice_no}
                            </span>
                        </h1>
                        <div className="flex gap-2">
                            <Link
                                href={route("invoices.edit", invoice.id)}
                                className="btn btn-warning flex items-center gap-2"
                            >
                                <Pencil className="w-4 h-4" /> Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn btn-error"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>

                    {/* Company & Customer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h2 className="font-semibold text-lg flex items-center gap-2 text-emerald-400">
                                <Users className="w-5 h-5" /> Perusahaan
                            </h2>
                            <p>{company?.name}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg flex items-center gap-2 text-primary">
                                <Users className="w-5 h-5" /> Customer
                            </h2>
                            <p>{customer?.name}</p>
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm opacity-70">Tanggal Invoice</p>
                            <p>{invoice.invoice_date}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-70">Jatuh Tempo</p>
                            <p>{invoice.due_date}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-70">Mata Uang</p>
                            <p>{invoice.currency}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-70">Status</p>
                            <span
                                className={`badge ${invoice.status === "paid"
                                    ? "badge-success"
                                    : invoice.status === "pending"
                                        ? "badge-warning"
                                        : "badge-neutral"
                                    }`}
                            >
                                {invoice.status}
                            </span>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                        <table className="table w-full mt-4">
                            <thead>
                                <tr className="bg-base-300 text-sm">
                                    <th>Produk</th>
                                    <th>Unit</th>
                                    <th>Qty</th>
                                    <th>Harga</th>
                                    <th>Diskon</th>
                                    <th>Pajak</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((i, idx) => (
                                    <tr key={idx} className="hover:bg-base-100/50 transition">
                                        <td>{i.product?.name}</td>
                                        <td>{i.unit}</td>
                                        <td>{formatInteger(i.quantity)}</td>
                                        <td>{formatRupiah(i.price)}</td>
                                        <td>
                                            {i.discount_type === "percent"
                                                ? formatInteger(i.discount) + "%"
                                                : formatRupiah(i.discount)}
                                        </td>
                                        <td>{formatInteger(i.tax)}%</td>
                                        <td>{formatRupiah(i.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="max-w-md ml-auto space-y-2 mt-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatRupiah(invoice.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Diskon</span>
                            <span>{formatRupiah(invoice.discount_total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Pajak</span>
                            <span>{formatRupiah(invoice.tax_total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Biaya Pengiriman</span>
                            <span>{formatRupiah(invoice.shipping_cost)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Extra Diskon</span>
                            <span>{formatRupiah(invoice.extra_discount)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Grand Total</span>
                            <span>{formatRupiah(invoice.grand_total)}</span>
                        </div>
                    </div>

                    {/* Notes & Terms */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-1">Keterangan</h3>
                        <p>{invoice.keterangan || "-"}</p>
                        <h3 className="font-semibold mt-3 mb-1">Syarat & Ketentuan</h3>
                        <p>{invoice.terms || "-"}</p>
                    </div>

                    {/* Signature */}
                    {invoice.signature_url && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-1">Tanda Tangan</h3>
                            <img src={invoice.signature_url} alt="Signature" className="h-16 mt-1" />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <Link href={route("invoices.index")} className="btn btn-ghost">
                            Kembali
                        </Link>
                        <Link
                            href={route("invoices.edit", invoice.id)}
                            className="btn btn-primary flex items-center gap-2 shadow-lg shadow-primary/40"
                        >
                            <Pencil className="w-4 h-4" /> Edit Invoice
                        </Link>
                    </div>
                </motion.div>
            </div>
        </ModernDashboardLayout>
    );
}
