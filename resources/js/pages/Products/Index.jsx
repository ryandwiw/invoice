import React from "react";
import { Link, router, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            router.delete(route("products.destroy", id));
        }
    };

    // Format angka ke Rupiah
    const formatRupiah = (value) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="max-w-7xl mx-auto p-3">
                <div className="card bg-base-100/50 backdrop-blur-lg shadow-xl border border-base-300 p-6 space-y-4">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <h1 className="flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                            ✨ Daftar Produk
                        </h1>
                        <Link
                            href={route("products.create")}
                            className="btn btn-primary shadow-md flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Tambah Produk
                        </Link>
                    </motion.div>

                    {/* Wrapper Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-primary hover:shadow-primary/50 transition-all p-2 space-y-4 "
                    >
                        <div className="card-body overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Nama Produk</th>
                                        <th>SKU</th>
                                        <th>Stok</th>
                                        <th>Harga</th>
                                        <th className="text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="transition-colors duration-200 hover:bg-primary/10"
                                        >
                                            <td className="font-bold text-emerald-400">
                                                {product.name}
                                            </td>
                                            <td className="font-mono text-sm text-gray-500">
                                                {product.sku}
                                            </td>
                                            <td>
                                                {product.stock?.quantity_pcs || 0} pcs
                                            </td>
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    {product.prices.map((p, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs bg-base-300 rounded-md px-2 py-1 inline-block"
                                                        >
                                                            {p.label} ({p.unit}, min {p.min_qty}):{" "}
                                                            <span className="font-semibold text-purple-400">
                                                                {formatRupiah(p.price)}
                                                            </span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route("products.show", product.id)}
                                                        className="btn btn-xs btn-ghost flex items-center gap-1"
                                                    >
                                                        <Eye className="w-4 h-4" /> Show
                                                    </Link>
                                                    <Link
                                                        href={route("products.edit", product.id)}
                                                        className="btn btn-xs btn-accent flex items-center gap-1"
                                                    >
                                                        <Pencil className="w-4 h-4" /> Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="btn btn-xs btn-error flex items-center gap-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Pagination */}
                    <div className="mt-10 flex justify-center gap-2">
                        {products.links &&
                            products.links.map((link, i) => (
                                <button
                                    key={i}
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
                </div>
            </div>
        </ModernDashboardLayout>
    );
}
