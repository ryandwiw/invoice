import React from "react";
import { Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Package,
    FileText,
    Tag,
    ArrowLeft,
    Pencil,
} from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Show({ product }) {
    return (
        <ModernDashboardLayout>
            <Head title="Detail Produk" />
            <div className="max-w-6xl mx-auto p-3">
                <div className="card bg-base-100/50 backdrop-blur-lg shadow-xl border border-base-300 p-6 space-y-6">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <Package className="w-7 h-7 text-purple-500" />
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                                Detail Produk
                            </span>
                        </h1>

                        <Link
                            href={route("products.index")}
                            className="btn btn-primary shadow-md flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </Link>
                    </motion.div>

                    {/* Informasi Produk */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-purple-400 hover:shadow-purple-400/40 transition-all p-6 space-y-4"
                    >
                        <h2 className="font-semibold text-lg flex items-center gap-2 text-emerald-400">
                            <FileText className="w-5 h-5" /> Informasi Produk
                        </h2>

                        {/* Gabungan Stok + Rincian */}
                        <div className="sm:col-span-2">
                            {product.stock.quantity_pcs > 0 ? (
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-base">
                                    {/* Label Stok */}
                                    <span className="text-sm opacity-70">Stok</span>

                                    {/* Total Stok */}
                                    <span className="badge badge-primary">
                                        {product.stock.quantity_pcs} {product.unit ?? "pcs"}
                                    </span>

                                    {/* Karton */}
                                    <span className="badge badge-outline badge-info">
                                        {Math.floor(product.stock.quantity_pcs / product.pieces_per_carton)} karton
                                    </span>

                                    {/* Sisa Pcs */}
                                    <span className="badge badge-outline badge-accent">
                                        {product.stock.quantity_pcs % product.pieces_per_carton} pcs
                                    </span>

                                    {/* Info isi per karton */}
                                    <span className="text-xs opacity-70">
                                        (Isi per Karton: {product.pieces_per_carton} pcs)
                                    </span>
                                </div>
                            ) : (
                                <p className="italic opacity-70 mt-1">Stok kosong</p>
                            )}
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm opacity-70">SKU Produk</p>
                                <p className="font-medium">{product.sku}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Nama Produk</p>
                                <p className="font-medium">{product.name}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-sm opacity-70">Deskripsi</p>
                                <p>{product.description || "-"}</p>
                            </div>

                        </div>
                    </motion.div>


                    {/* Harga Produk */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-primary hover:shadow-primary/50 transition-all p-6 space-y-4"
                    >
                        <h2 className="font-semibold text-lg flex items-center gap-2 text-primary">
                            <Tag className="w-5 h-5" /> Harga Produk
                        </h2>

                        {product.prices.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr className="bg-base-300 text-sm ">
                                            <th>Label</th>
                                            <th>Unit</th>
                                            <th>Min Qty</th>
                                            <th>Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.prices.map((p, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-base-100/50 transition"
                                            >
                                                <td>{p.label}</td>
                                                <td>
                                                    <span className="badge badge-outline badge-info">
                                                        {p.unit}
                                                    </span>
                                                </td>
                                                <td>{p.min_qty}</td>
                                                <td className="font-semibold text-primary">
                                                    Rp{" "}
                                                    {Number(p.price).toLocaleString("id-ID")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="opacity-70">Belum ada harga</p>
                        )}
                    </motion.div>

                    {/* Tombol Aksi (konsisten dengan Create) */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("products.index")}
                            className="btn btn-ghost"
                        >
                            Batal
                        </Link>
                        <Link
                            href={route("products.edit", product.id)}
                            className="btn btn-primary flex items-center gap-2 shadow-lg shadow-primary/40"
                        >
                            <Pencil className="w-4 h-4" /> Edit Produk
                        </Link>
                    </div>
                </div>
            </div>
        </ModernDashboardLayout>
    );
}
