import React, { useState } from "react";
import { Link, usePage, Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Index({ customers }) {
    const { flash } = usePage().props;
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus client ini?")) {
            router.delete(route("customers.destroy", id));
        }
    };

    return (
        <ModernDashboardLayout>
            <Head title="Daftar client" />
            <div className="max-w-7xl mx-auto p-4">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between mb-6"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2">
                        ✨ Daftar Client
                    </h1>
                    <Link
                        href={route("customers.create")}
                        className="btn btn-primary flex items-center gap-2 shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Tambah Client
                    </Link>
                </motion.div>

                {flash?.success && (
                    <div className="alert alert-success mb-4">
                        {flash.success}
                    </div>
                )}

                {/* Tabel client */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card bg-base-100/50 backdrop-blur-lg shadow-xl border border-base-300 p-4 overflow-x-auto"
                >
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Telepon</th>
                                <th>Email</th>
                                <th className="text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-6 text-gray-400">
                                        Belum ada data client.
                                    </td>
                                </tr>
                            ) : (
                                customers.data.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="transition-colors duration-200 hover:bg-primary/10"
                                    >
                                        <td className="font-semibold text-emerald-400">{customer.name}</td>
                                        <td
                                            className="max-w-xs truncate text-blue-500 cursor-pointer"
                                            onClick={() => setSelectedAddress(customer.address)}
                                            title="Klik untuk melihat lengkap"
                                        >
                                            {customer.address || "-"}
                                        </td>
                                        <td>{customer.phone || "-"}</td>
                                        <td>{customer.email || "-"}</td>
                                        <td className="flex justify-end gap-2">
                                            <Link
                                                href={route("customers.show", customer.id)}
                                                className="btn btn-xs btn-ghost flex items-center gap-1"
                                            >
                                                <Eye className="w-4 h-4" /> Detail
                                            </Link>
                                            <Link
                                                href={route("customers.edit", customer.id)}
                                                className="btn btn-xs btn-accent flex items-center gap-1"
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="btn btn-xs btn-error flex items-center gap-1"
                                            >
                                                <Trash2 className="w-4 h-4" /> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2">
                    {customers.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            className={`btn btn-sm ${link.active ? "btn-primary" : "btn-outline btn-secondary"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedAddress && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <h2 className="font-bold text-lg mb-4">Alamat Lengkap</h2>
                            <p className="break-words">{selectedAddress}</p>
                            <button
                                className="btn btn-sm btn-primary mt-4"
                                onClick={() => setSelectedAddress(null)}
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
