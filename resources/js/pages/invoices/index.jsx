import React, { useState } from "react";
import { Link, usePage, Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Index() {
    const { invoices, flash } = usePage().props;
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const formatCurrency = (value, currency = invoices?.data?.[0]?.currency || "IDR") => {
        if (value == null) return "-";
        return new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus invoice ini?")) {
            router.delete(route("invoices.destroy", id));
        }
    };

    return (
        <ModernDashboardLayout>
            <Head title="Daftar Invoice" />
            <div className="p-4 mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between mb-6"
                >
                    <h1 className="flex items-center gap-2 text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 bg-clip-text">
                        📑 Daftar Invoice
                    </h1>
                    <Link
                        href={route("invoices.create")}
                        className="flex items-center gap-2 shadow-md btn btn-primary"
                    >
                        <Plus className="w-4 h-4" /> Buat Invoice
                    </Link>
                </motion.div>

                {flash?.success && (
                    <div className="mb-4 alert alert-success">{flash.success}</div>
                )}

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 overflow-x-auto border shadow-xl card bg-base-100/50 backdrop-blur-lg border-base-300"
                >
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No Invoice</th>
                                <th>Customer</th>
                                <th>Tanggal</th>
                                <th className="text-right">Total</th>
                                <th>Status</th>
                                <th className="text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.data && invoices.data.length ? (
                                invoices.data.map((inv, idx) => (
                                    <tr
                                        key={inv.id}
                                        className="transition-colors duration-200 hover:bg-primary/10"
                                    >
                                        <td>{invoices.from + idx}</td>
                                        <td className="font-semibold text-cyan-400">
                                            {inv.invoice_no}
                                        </td>
                                        <td>{inv.customer?.name ?? "-"}</td>
                                        <td>{formatDate(inv.invoice_date)}</td>
                                        <td className="font-semibold text-right text-emerald-400">
                                            {formatCurrency(inv.grand_total, inv.currency)}
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    inv.status === "draft"
                                                        ? "badge-outline"
                                                        : inv.status === "printed"
                                                        ? "badge-success"
                                                        : "badge-info"
                                                }`}
                                            >
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="flex justify-end gap-2">
                                            <Link
                                                href={route("invoices.show", inv.id)}
                                                className="flex items-center gap-1 btn btn-xs btn-ghost"
                                            >
                                                <Eye className="w-4 h-4" /> Lihat
                                            </Link>
                                            <Link
                                                href={route("invoices.edit", inv.id)}
                                                className="flex items-center gap-1 btn btn-xs btn-accent"
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(inv.id)}
                                                className="flex items-center gap-1 btn btn-xs btn-error"
                                            >
                                                <Trash2 className="w-4 h-4" /> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-6 text-center text-gray-400">
                                        Belum ada invoice.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
                {invoices.links && (
                    <div className="flex justify-center gap-2 mt-6">
                        {invoices.links.map((link, idx) => (
                            <button
                                key={idx}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={`btn btn-sm ${
                                    link.active
                                        ? "btn-primary"
                                        : "btn-outline btn-secondary"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Invoice Preview */}
            <AnimatePresence>
                {selectedInvoice && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-md p-6 rounded-lg shadow-lg bg-base-100"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <h2 className="mb-4 text-lg font-bold">Detail Invoice</h2>
                            <p>No: {selectedInvoice.invoice_no}</p>
                            <p>Customer: {selectedInvoice.customer?.name}</p>
                            <p>Total: {formatCurrency(selectedInvoice.grand_total)}</p>
                            <p>Status: {selectedInvoice.status}</p>
                            <p>Tanggal: {formatDate(selectedInvoice.invoice_date)}</p>
                            <button
                                className="mt-4 btn btn-sm btn-primary"
                                onClick={() => setSelectedInvoice(null)}
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ModernDashboardLayout>
    );
}
