"use client";
import React from "react";
import { usePage, Link, router } from "@inertiajs/react";

export default function Show() {
    const { invoice, company, customer, products } = usePage().props;

    const handleDelete = () => {
        if (confirm("Yakin ingin menghapus invoice ini?")) {
            router.delete(route("invoices.destroy", invoice.id), {
                onSuccess: () => alert("Invoice berhasil dihapus!"),
                onError: () => alert("Gagal menghapus invoice."),
            });
        }
    };

    return (
        <div className="max-w-6xl p-6 mx-auto shadow-xl bg-base-100 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Detail Invoice #{invoice.invoice_no}</h1>
                <div className="flex gap-2">
                    <Link
                        href={route("invoices.edit", invoice.id)}
                        className="btn btn-warning"
                    >
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error">
                        Hapus
                    </button>
                </div>
            </div>

            {/* Company & Customer Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="font-semibold">Perusahaan</h2>
                    <p>{company?.name}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Customer</h2>
                    <p>{customer?.name}</p>
                </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="font-semibold">Tanggal Invoice</h2>
                    <p>{invoice.invoice_date}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Jatuh Tempo</h2>
                    <p>{invoice.due_date}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Mata Uang</h2>
                    <p>{invoice.currency}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Status</h2>
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
            <div className="mb-6 overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
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
                            <tr key={idx}>
                                <td>{i.product?.name}</td>
                                <td>{i.unit}</td>
                                <td>{i.quantity}</td>
                                <td>{i.price?.toLocaleString()}</td>
                                <td>
                                    {i.discount}
                                    {i.discount_type === "percent" ? "%" : "Rp"}
                                </td>
                                <td>{i.tax}%</td>
                                <td>{i.total?.toLocaleString()}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
                <div className="w-full max-w-md p-4 rounded-lg bg-base-200">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{invoice.subtotal?.toLocaleString()} {invoice.currency}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Diskon</span>
                        <span>{invoice.discount_total?.toLocaleString()} {invoice.currency}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Pajak</span>
                        <span>{invoice.tax_total?.toLocaleString()} {invoice.currency}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Biaya Pengiriman</span>
                        <span>{invoice.shipping_cost?.toLocaleString()} {invoice.currency}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Extra Diskon</span>
                        <span>{invoice.extra_discount?.toLocaleString()} {invoice.currency}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Grand Total</span>
                        <span>{invoice.grand_total?.toLocaleString()} {invoice.currency}</span>
                    </div>
                </div>
            </div>

            {/* Notes & Terms */}
            <div className="mt-6">
                <h3 className="font-semibold">Keterangan</h3>
                <p>{invoice.keterangan || "-"}</p>
            </div>
            <div className="mt-6">
                <h3 className="font-semibold">Syarat & Ketentuan</h3>
                <p>{invoice.terms || "-"}</p>
            </div>

            {/* Signature */}
            {invoice.signature_url && (
                <div className="mt-6">
                    <h3 className="font-semibold">Tanda Tangan</h3>
                    <img
                        src={invoice.signature_url}
                        alt="Signature"
                        className="h-16 mt-2"
                    />
                </div>
            )}
        </div>
    );
}
