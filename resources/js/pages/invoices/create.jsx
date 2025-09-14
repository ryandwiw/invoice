"use client";
import React, { useEffect, useState } from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    User,
    Plus,
    Trash2,
    Eye,
    Save,
    X,
    ChevronLeft,
    Grid,
    Percent,
} from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Create() {
    const { company, customers, products } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        company_id: company?.id || null,
        customer_id: "",
        invoice_no: "",
        invoice_date: new Date().toISOString().slice(0, 10),
        due_date: "",
        items: [],
        extra_discount: 0,
        shipping_cost: 0,
        discount_total: 0,
        tax_total: 0,
        terms: "",
        keterangan: "",
        currency: "IDR", // default rupiah
        signature_path: null,
        status: "draft",
    });

    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        if (!Array.isArray(data.items)) setData("items", []);
    }, []);

    const currencyFormat = (v) => {
        const n = Number(v) || 0;
        return n.toLocaleString("id-ID"); // format ke Rupiah
    };

    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                product_id: "",
                price_id: "",
                unit: "",
                quantity: 1,
                price: 0,
                discount: 0,
                discount_type: "percent",
                tax: 0,
                total: 0,
            },
        ]);
    };

    const removeItem = (index) => {
        setData(
            "items",
            data.items.filter((_, i) => i !== index)
        );
    };

    const updateItem = (index, field, value) => {
        const items = [...data.items];
        const item = { ...items[index] };

        if (["quantity", "price", "discount", "tax"].includes(field)) {
            value = Number(value) || 0;
        }

        item[field] = value;

        if (field === "product_id") {
            item.price_id = "";
            item.price = 0;
            item.unit = "";
        }

        if (field === "price_id") {
            const prod = products?.find((p) => p.id == item.product_id);
            const priceObj = prod?.prices?.find((pr) => pr.id == value);
            if (priceObj) {
                item.price = Number(priceObj.price) || 0;
                item.unit = priceObj.unit || "";
            }
        }

        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const discount =
            item.discount_type === "percent"
                ? (qty * price * (Number(item.discount) || 0)) / 100
                : Number(item.discount) || 0;
        const subtotal = qty * price - discount;
        const taxValue = (subtotal * (Number(item.tax) || 0)) / 100;
        item.total = Math.max(0, subtotal + taxValue);

        items[index] = item;
        setData("items", items);
    };

    // totals
    const subtotal = data.items.reduce(
        (s, i) => s + (Number(i.quantity) || 0) * (Number(i.price) || 0),
        0
    );
    const totalDiscount = data.items.reduce((s, i) => {
        const qty = Number(i.quantity) || 0;
        const price = Number(i.price) || 0;
        return (
            s +
            (i.discount_type === "percent"
                ? (qty * price * (Number(i.discount) || 0)) / 100
                : Number(i.discount) || 0)
        );
    }, 0);
    const totalTax = data.items.reduce((s, i) => {
        const qty = Number(i.quantity) || 0;
        const price = Number(i.price) || 0;
        const discount =
            i.discount_type === "percent"
                ? (qty * price * (Number(i.discount) || 0)) / 100
                : Number(i.discount) || 0;
        const sub = qty * price - discount;
        return s + (sub * (Number(i.tax) || 0)) / 100;
    }, 0);

    const grandTotal =
        subtotal -
        totalDiscount +
        totalTax +
        Number(data.shipping_cost || 0) -
        Number(data.extra_discount || 0);

    const submit = (e) => {
        e.preventDefault();

        post(route("invoices.store"), {
            data: {
                ...data,
                discount_total: Number(totalDiscount) || 0,
                tax_total: Number(totalTax) || 0,
                shipping_cost: Number(data.shipping_cost) || 0,
                extra_discount: Number(data.extra_discount) || 0,
                grand_total: grandTotal,
            },
            forceFormData: true,
            onError: (err) => {
                console.error("Validation errors:", err);
                alert("Ada error input, cek console (F12)");
            },
            onSuccess: () => {
                alert("Invoice berhasil disimpan!");
            },
        });
    };

    const preview = () => {
        setPreviewData({ ...data, subtotal, totalDiscount, totalTax, grandTotal });
    };

    return (
        <ModernDashboardLayout>
            <Head title="Buat Invoice Baru" />

            <div className="max-w-6xl mx-auto p-4">
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card bg-base-100/40 backdrop-blur-md border border-base-300 shadow-xl p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-gradient" />
                            <div>
                                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                    Buat Invoice Baru
                                </h1>
                                <p className="text-sm opacity-70">
                                    Buat dan simpan invoice dengan cepat
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={preview}
                                className="btn btn-ghost btn-sm flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" /> Preview
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-outline btn-sm flex items-center gap-2"
                                type="button"
                            >
                                <ChevronLeft className="w-4 h-4" /> Kembali
                            </button>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Bagian Atas */}
                        <motion.div
                            layout
                            whileHover={{ scale: 1.01 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="col-span-2 space-y-4">
                                {/* Customer */}
                                <div className="form-control">
                                    <label className="label flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span className="label-text">Pelanggan</span>
                                    </label>
                                    <select
                                        value={data.customer_id}
                                        onChange={(e) => setData("customer_id", e.target.value)}
                                        className="select select-bordered select-primary w-full"
                                    >
                                        <option value="">-- Pilih Customer --</option>
                                        {customers?.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.customer_id && (
                                        <span className="text-sm text-error">
                                            {errors.customer_id}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="form-control">
                                        <label className="label">Nomor Invoice</label>
                                        <input
                                            type="text"
                                            value={data.invoice_no}
                                            onChange={(e) => setData("invoice_no", e.target.value)}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">Tanggal</label>
                                        <input
                                            type="date"
                                            value={data.invoice_date}
                                            onChange={(e) => setData("invoice_date", e.target.value)}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">Jatuh Tempo</label>
                                        <input
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) => setData("due_date", e.target.value)}
                                            className="input input-bordered"
                                        />
                                    </div>
                                </div>

                                {/* Notes & Terms (pindah ke atas sebelum items) */}
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div className="form-control">
                                        <label className="label">Keterangan</label>
                                        <textarea
                                            value={data.keterangan}
                                            onChange={(e) => setData("keterangan", e.target.value)}
                                            className="textarea textarea-bordered h-24"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">Syarat & Ketentuan</label>
                                        <textarea
                                            value={data.terms}
                                            onChange={(e) => setData("terms", e.target.value)}
                                            className="textarea textarea-bordered h-24"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sidebar summary & extras */}
                            <motion.div layout className="space-y-4">
                                <div className="card p-4 bg-base-200/60 border border-base-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">Ringkasan</h3>
                                        <div className="badge badge-outline">{data.currency}</div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">
                                                {currencyFormat(subtotal)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Diskon</span>
                                            <span className="font-semibold">
                                                -{currencyFormat(totalDiscount)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Pajak</span>
                                            <span className="font-semibold">
                                                {currencyFormat(totalTax)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="label">Ongkir</label>
                                            <input
                                                type="number"
                                                value={data.shipping_cost}
                                                onChange={(e) =>
                                                    setData("shipping_cost", Number(e.target.value) || 0)
                                                }
                                                className="input input-bordered input-sm w-28 text-right"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="label">Diskon Tambahan</label>
                                            <input
                                                type="number"
                                                value={data.extra_discount}
                                                onChange={(e) =>
                                                    setData("extra_discount", Number(e.target.value) || 0)
                                                }
                                                className="input input-bordered input-sm w-28 text-right"
                                            />
                                        </div>

                                        <div className="pt-3 border-t">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Grand Total</span>
                                                <span>{currencyFormat(grandTotal)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Items (pindah ke paling bawah sebelum tanda tangan) */}
                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Grid className="w-5 h-5" /> Item Barang
                                </h2>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline flex items-center gap-2"
                                    onClick={addItem}
                                >
                                    <Plus className="w-4 h-4" /> Tambah Item
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Produk</th>
                                            <th>Satuan</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Diskon</th>
                                            <th>Pajak</th>
                                            <th className="text-right">Total</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.items.map((item, idx) => (
                                            <motion.tr
                                                key={idx}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <td className="min-w-[180px]">
                                                    <select
                                                        value={item.product_id}
                                                        onChange={(e) =>
                                                            updateItem(idx, "product_id", e.target.value)
                                                        }
                                                        className="select select-bordered select-sm w-full"
                                                    >
                                                        <option value="">-- Produk --</option>
                                                        {products?.map((p) => (
                                                            <option key={p.id} value={p.id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    {item.product_id ? (
                                                        <select
                                                            value={item.price_id}
                                                            onChange={(e) =>
                                                                updateItem(idx, "price_id", e.target.value)
                                                            }
                                                            className="select select-bordered select-sm w-36"
                                                        >
                                                            <option value="">-- Pilih --</option>
                                                            {products
                                                                .find((p) => p.id == item.product_id)
                                                                ?.prices?.map((pr) => (
                                                                    <option key={pr.id} value={pr.id}>
                                                                        {pr.label} ({pr.unit})
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    ) : (
                                                        <span className="text-sm opacity-60">-</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) =>
                                                            updateItem(idx, "price", e.target.value)
                                                        }
                                                        className="input input-bordered input-sm w-28 text-right"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateItem(idx, "quantity", e.target.value)
                                                        }
                                                        className="input input-bordered input-sm w-20"
                                                    />
                                                </td>
                                                <td>
                                                    <div className="flex gap-1">
                                                        <input
                                                            type="number"
                                                            value={item.discount}
                                                            onChange={(e) =>
                                                                updateItem(idx, "discount", e.target.value)
                                                            }
                                                            className="input input-bordered input-sm w-20"
                                                        />
                                                        <select
                                                            value={item.discount_type}
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    idx,
                                                                    "discount_type",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="select select-bordered select-sm w-20"
                                                        >
                                                            <option value="percent">%</option>
                                                            <option value="amount">Rp</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <select
                                                        value={item.tax}
                                                        onChange={(e) =>
                                                            updateItem(idx, "tax", e.target.value)
                                                        }
                                                        className="select select-bordered select-sm w-28"
                                                    >
                                                        <option value="0">0%</option>
                                                        <option value="11">11% PPN</option>
                                                        <option value="12">12% PPN</option>
                                                    </select>
                                                </td>
                                                <td className="text-right font-semibold">
                                                    {currencyFormat(item.total)}
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-error btn-sm"
                                                        onClick={() => removeItem(idx)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                        {data.items.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="text-center opacity-60 py-6"
                                                >
                                                    Belum ada item. Klik "Tambah Item" untuk memulai.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Signature (paling bawah) */}
                        <div className="card p-4 bg-base-200/50 border border-base-300">
                            <div className="form-control mt-3">
                                <label className="label">Tanda Tangan</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData("signature_path", e.target.files[0])}
                                    className="file-input file-input-bordered"
                                />
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={preview}
                                    className="btn btn-ghost btn-sm"
                                >
                                    <Eye className="w-4 h-4" /> Preview
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn btn-primary btn-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />{" "}
                                    {processing ? "Menyimpan..." : "Simpan Invoice"}
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
                {previewData && (
                    <div className="modal modal-open">
                        <div className="max-w-4xl modal-box">
                            <h3 className="mb-4 text-lg font-bold">Preview Invoice</h3>
                            <div className="p-4 border rounded bg-base-200">
                                {/* Header */}
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold">{company?.name}</h2>
                                        <p>{company?.address}</p>
                                        <p>{company?.phone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p>No: {data.invoice_no}</p>
                                        <p>Tanggal: {data.invoice_date}</p>
                                        <p>Jatuh Tempo: {data.due_date}</p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="mt-4">
                                    <h3 className="font-semibold">Kepada:</h3>
                                    {(() => {
                                        const cust = customers.find((c) => c.id == data.customer_id);
                                        return cust ? (
                                            <div className="p-2 mt-1 border rounded bg-base-100">
                                                <p className="font-bold">{cust.name}</p>
                                                <p>{cust.address}</p>
                                                <p>{cust.phone}</p>
                                                {cust.email && <p>{cust.email}</p>}
                                                {cust.city && <p>{cust.city}</p>}
                                            </div>
                                        ) : (
                                            <p>-</p>
                                        );
                                    })()}
                                </div>

                                {/* Items */}
                                <table className="table w-full mt-4 border table-zebra">
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
                                        {data.items.map((i, idx) => {
                                            const product = products.find(
                                                (p) => p.id == i.product_id
                                            );
                                            const price = product?.prices.find(
                                                (pr) => pr.id == i.price_id
                                            );
                                            return (
                                                <tr key={idx}>
                                                    <td>{product?.name}</td>
                                                    <td>{price?.unit}</td>
                                                    <td>{i.quantity}</td>
                                                    <td>{i.price.toLocaleString()}</td>
                                                    <td>
                                                        {i.discount}
                                                        {i.discount_type === "percent" ? "%" : "Rp"}
                                                    </td>
                                                    <td>{i.tax}%</td>
                                                    <td>{i.total.toLocaleString()}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/* Summary */}
                                <div className="p-4 mt-4 space-y-1 text-right border rounded shadow bg-base-100">
                                    <div>Subtotal: {subtotal.toLocaleString()}</div>
                                    <div>Total Diskon: -{totalDiscount.toLocaleString()}</div>
                                    <div>Total Pajak: {totalTax.toLocaleString()}</div>
                                    <div>Ongkir: {data.shipping_cost}</div>
                                    <div>Diskon Tambahan: {data.extra_discount}</div>
                                    <div className="text-lg font-bold">
                                        Grand Total: {grandTotal.toLocaleString()}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="mt-6">
                                    <h3 className="font-semibold">Keterangan</h3>
                                    <p>{data.keterangan || "-"}</p>
                                </div>
                                <div className="mt-6">
                                    <h3 className="font-semibold">Syarat & Ketentuan</h3>
                                    <p>{data.terms || "-"}</p>
                                </div>

                                {/* Signature */}
                                {data.signature_path && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold">Tanda Tangan</h3>
                                        <img
                                            src={URL.createObjectURL(data.signature_path)}
                                            alt="Signature"
                                            className="h-16 mt-2"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <button onClick={() => setPreviewData(null)} className="btn">
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ModernDashboardLayout>
    );
}
