import React from "react";
import { Link, router } from "@inertiajs/react";

export default function Show({ product }) {
    const totalPcs = product.stock?.quantity_pcs || 0;

    const handleDelete = () => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            router.delete(route("products.destroy", product.id));
        }
    };

    return (
        <div className="max-w-3xl p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Detail Produk</h1>
                <div className="flex gap-2">
                    <Link href={route("products.edit", product.id)} className="btn btn-warning">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error">
                        Hapus
                    </button>
                    <Link href={route("products.index")} className="btn btn-ghost">
                        Kembali
                    </Link>
                </div>
            </div>

            {/* Informasi Produk */}
            <div className="p-4 mb-6 border rounded-lg shadow-sm">
                <h2 className="mb-2 text-lg font-semibold">Informasi Produk</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><b>SKU:</b> {product.sku}</div>
                    <div><b>Nama:</b> {product.name}</div>
                    <div><b>Deskripsi:</b> {product.description || "-"}</div>
                    <div><b>Isi per Karton:</b> {product.pieces_per_carton}</div>
                </div>
            </div>

            {/* Stok */}
            <div className="p-4 mb-6 border rounded-lg shadow-sm">
                <h2 className="mb-2 text-lg font-semibold">Stok Awal</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><b>Total Stok:</b> {totalPcs} pcs</div>
                    {product.stock && (
                        <>
                            <div><b>Karton:</b> {Math.floor(product.stock.quantity_pcs / product.pieces_per_carton)}</div>
                            <div><b>Pcs:</b> {product.stock.quantity_pcs % product.pieces_per_carton}</div>
                        </>
                    )}
                </div>
            </div>

            {/* Harga */}
            <div className="p-4 border rounded-lg shadow-sm">
                <h2 className="mb-2 text-lg font-semibold">Harga Produk</h2>
                <div className="grid grid-cols-4 gap-2 mb-2 text-sm font-semibold">
                    <span>Label</span>
                    <span>Unit</span>
                    <span>Min Qty</span>
                    <span>Harga</span>
                </div>
                {product.prices.map((p, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-2 mb-1 text-sm">
                        <span>{p.label}</span>
                        <span>{p.unit}</span>
                        <span>{p.min_qty}</span>
                        <span>{p.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
