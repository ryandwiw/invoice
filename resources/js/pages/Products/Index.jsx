import React from "react";
import { Link, router } from "@inertiajs/react";

export default function Index({ products }) {

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            router.delete(route("products.destroy", id));
        }
    };

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Produk</h1>
                <Link href={route("products.create")} className="btn btn-primary">
                    Tambah Produk
                </Link>
            </div>

            <table className="w-full border border-gray-200 table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">SKU</th>
                        <th className="px-4 py-2 border">Nama</th>
                        <th className="px-4 py-2 border">Stok</th>
                        <th className="px-4 py-2 border">Harga</th>
                        <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product) => (
                        <tr key={product.id} className="text-center">
                            <td className="px-4 py-2 border">{product.sku}</td>
                            <td className="px-4 py-2 border">{product.name}</td>
                            <td className="px-4 py-2 border">{product.stock?.quantity_pcs || 0} pcs</td>
                            <td className="px-4 py-2 border">
                                {product.prices.map((p, idx) => (
                                    <div key={idx} className="text-sm">
                                        {p.label} ({p.unit}, min {p.min_qty}): {p.price}
                                    </div>
                                ))}
                            </td>
                            <td className="flex justify-center gap-2 px-4 py-2 border">
                                <Link
                                    href={route("products.show", product.id)}
                                    className="btn btn-sm btn-ghost"
                                >
                                    Show
                                </Link>
                                <Link
                                    href={route("products.edit", product.id)}
                                    className="btn btn-sm btn-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                {products.links && products.links.map((link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url)}
                        className={`px-3 py-1 border rounded mx-1 ${link.active ? 'bg-blue-500 text-white' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
