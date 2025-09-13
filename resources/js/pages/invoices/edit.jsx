"use client";
import { router } from "@inertiajs/react";

import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { company, customers, products, invoice } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        company_id: invoice.company_id || company?.id || null,
        customer_id: invoice.customer_id || "",
        invoice_no: invoice.invoice_no || "",
        invoice_date: invoice.invoice_date ? invoice.invoice_date.slice(0, 10) : new Date().toISOString().slice(0, 10),
        due_date: invoice.due_date ? invoice.due_date.slice(0, 10) : "",
        currency: invoice.currency || "IDR",
        keterangan: invoice.keterangan || "",
        terms: invoice.terms || "",
        extra_discount: invoice.extra_discount || 0,
        shipping_cost: invoice.shipping_cost || 0,
        discount_total: invoice.discount_total || 0,
        tax_total: invoice.tax_total || 0,
        signature_path: invoice.signature_path || "",
        status: invoice.status || "draft",
        items: invoice.items.map((i) => ({
            product_id: i.product_id,
            price_id: i.price_id || "",
            unit: i.unit || "-",
            quantity: i.quantity,
            price: i.price,
            discount: i.discount,
            discount_type: i.discount_type ?? "percent",
            tax: i.tax ?? 0,
            total: i.total,
        })) || [],
    });


    const [previewData, setPreviewData] = useState(null);

    // Tambah item
    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                product_id: "",
                price_id: "",
                unit: "-",        // ✅ default biar tidak null
                quantity: 1,
                price: 0,
                discount: 0,
                discount_type: "percent",
                tax: 0,
                total: 0,
            },
        ]);
    };

    // Hapus item
    const removeItem = (index) => {
        setData(
            "items",
            data.items.filter((_, i) => i !== index)
        );
    };

    // Update item
    const updateItem = (index, field, value) => {
        const items = [...data.items];
        let item = { ...items[index] };

        if (["quantity", "price", "discount", "tax"].includes(field)) {
            item[field] = Number(value) || 0;
        } else {
            item[field] = value;
        }

        if (field === "price_id") {
            const product = products.find((p) => p.id == item.product_id);
            const priceObj = product?.prices.find((pr) => pr.id == value);
            if (priceObj) {
                item.price = priceObj.price;
                item.unit = priceObj.unit || "-";
            }
        }

        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const discountValue = Number(item.discount) || 0;
        const taxRate = Number(item.tax) || 0;

        let discount = 0;
        if (item.discount_type === "percent") {
            discount = (qty * price * discountValue) / 100;
        } else if (item.discount_type === "amount") {
            discount = discountValue;
        }

        const subtotal = qty * price - discount;
        const taxValue = (subtotal * taxRate) / 100;

        item.total = subtotal + taxValue;

        items[index] = item;
        setData("items", items);
    };




    // Hitung subtotal & total
    const subtotal = data.items.reduce((sum, i) => {
        const qty = Number(i.quantity) || 0;
        const price = Number(i.price) || 0;
        return sum + qty * price;
    }, 0);
    const totalDiscount = data.items.reduce((sum, i) => {
        const qty = Number(i.quantity) || 0;
        const price = Number(i.price) || 0;
        return (
            sum +
            (i.discount_type === "percent"
                ? (qty * price * (Number(i.discount) || 0)) / 100
                : Number(i.discount) || 0)
        );
    }, 0);
    const totalTax = data.items.reduce((sum, i) => {
        const qty = Number(i.quantity) || 0;
        const price = Number(i.price) || 0;
        const discount =
            i.discount_type === "percent"
                ? (qty * price * (Number(i.discount) || 0)) / 100
                : Number(i.discount) || 0;
        const subtotal = qty * price - discount;
        return sum + (subtotal * (Number(i.tax) || 0)) / 100;
    }, 0);

    const grandTotal =
        subtotal - totalDiscount + totalTax + Number(data.shipping_cost) - Number(data.extra_discount);

    // Submit
    // const submit = (e) => {
    //     e.preventDefault();
    //     console.log("Submitting data:", data);

    //     put(route("invoices.update", invoice.id), {
    //         ...data,
    //         items: data.items.map(i => ({
    //             ...i,
    //             price_id: i.price_id === "" ? null : i.price_id, // ✅ convert "" ke null
    //         })),
    //         subtotal: Number(subtotal) || 0,       // ✅ WAJIB
    //         discount_total: Number(totalDiscount) || 0,
    //         tax_total: Number(totalTax) || 0,
    //         shipping_cost: Number(data.shipping_cost) || 0,
    //         extra_discount: Number(data.extra_discount) || 0,
    //         grand_total:
    //             Number(subtotal) - Number(totalDiscount) + Number(totalTax)
    //             + Number(data.shipping_cost) - Number(data.extra_discount),
    //     }, {
    //         forceFormData: true,
    //         onError: (err) => {
    //             console.error("Validation errors:", err);
    //             alert("Ada error input, cek console untuk detail!");
    //         },
    //         onSuccess: () => {
    //             alert("Invoice berhasil diperbarui!");
    //         },
    //     });

    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // field utama
        formData.append("company_id", data.company_id);
        formData.append("customer_id", data.customer_id);
        formData.append("currency", data.currency);
        formData.append("invoice_no", data.invoice_no);
        formData.append("invoice_date", data.invoice_date);
        formData.append("due_date", data.due_date);
        formData.append("status", data.status);
        formData.append("keterangan", data.keterangan || "");
        formData.append("terms", data.terms || "");

        // items (pakai JSON stringify biar aman)
        formData.append("items", JSON.stringify(
            data.items.map(i => ({
                ...i,
                price_id: i.price_id === "" ? null : i.price_id,
            }))
        ));

        // perhitungan
        formData.append("subtotal", subtotal);
        formData.append("discount_total", totalDiscount);
        formData.append("tax_total", totalTax);
        formData.append("shipping_cost", data.shipping_cost);
        formData.append("extra_discount", data.extra_discount);
        formData.append("grand_total", grandTotal);

        // file tanda tangan (opsional)
        if (data.signature_path instanceof File) {
            formData.append("signature_path", data.signature_path);
        } else if (typeof data.signature_path === "string" && data.signature_path !== "") {
            formData.append("old_signature_path", data.signature_path);
        }


        // method override biar tetap PUT
        formData.append("_method", "put");

        // debug sebelum kirim
        console.log("=== FORM DATA SEBELUM KIRIM ===");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        // kirim pakai post (bukan put)
        router.post(route("invoices.update", invoice.id), formData, {
            preserveScroll: true,
            onError: (err) => console.error("Validation errors:", err),
            onSuccess: () => alert("Invoice berhasil diperbarui!"),
        });
    };





    // Preview
    const preview = () => {
        setPreviewData({
            ...data,
            subtotal,
            totalDiscount,
            totalTax,
            grandTotal,
        });
    };

    return (
        <div className="max-w-6xl p-6 mx-auto shadow-xl bg-base-100 rounded-2xl">
            <h1 className="mb-6 text-2xl font-bold">Edit Invoice</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer */}
                <div className="form-control">
                    <label className="label">Pelanggan</label>
                    <select
                        value={data.customer_id}
                        onChange={(e) => setData("customer_id", Number(e.target.value) || "")}
                        className="w-full select select-bordered select-primary"
                    >
                        <option value="">-- Pilih Customer --</option>
                        {customers?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    {errors.customer_id && (
                        <span className="text-sm text-error">{errors.customer_id}</span>
                    )}
                </div>

                {/* Invoice Info */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label">Nomor Invoice</label>
                        <input
                            type="text"
                            value={data.invoice_no}
                            onChange={(e) => setData("invoice_no", e.target.value)}
                            className="w-full input input-bordered input-primary"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Tanggal Invoice</label>
                        <input
                            type="date"
                            value={data.invoice_date}
                            onChange={(e) => setData("invoice_date", e.target.value)}
                            className="w-full input input-bordered input-primary"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Jatuh Tempo</label>
                        <input
                            type="date"
                            value={data.due_date}
                            onChange={(e) => setData("due_date", e.target.value)}
                            className="w-full input input-bordered input-primary"
                        />
                    </div>
                </div>

                <div className="w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text">Mata Uang</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={data.currency}
                        onChange={(e) => setData("currency", e.target.value)}
                    >
                        <option value="">-- Pilih Mata Uang --</option>
                        <option value="IDR">IDR (Rp)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                    </select>

                    {errors.currency && (
                        <span className="text-sm text-error">{errors.currency}</span>
                    )}
                </div>

                {/* Items */}
                <div>
                    <h2 className="mb-2 text-lg font-bold">Item Barang</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Satuan</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Diskon</th>
                                    <th>Pajak</th>
                                    <th>Total</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select
                                                value={item.product_id}
                                                onChange={(e) =>
                                                    updateItem(index, "product_id", e.target.value)
                                                }
                                                className="select select-bordered select-sm"
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
                                            {item.product_id && (
                                                <select
                                                    value={item.price_id}
                                                    onChange={(e) =>
                                                        updateItem(index, "price_id", e.target.value)
                                                    }
                                                    className="select select-bordered select-sm"
                                                >
                                                    {products
                                                        .find((p) => p.id == item.product_id)
                                                        ?.prices.map((pr) => (
                                                            <option key={pr.id} value={pr.id}>
                                                                {pr.label} ({pr.unit})
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </td>
                                        <td>{item.price.toLocaleString()}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItem(index, "quantity", e.target.value)
                                                }
                                                className="w-20 input input-bordered input-sm"
                                            />
                                        </td>
                                        <td>
                                            <div className="flex gap-1">
                                                <input
                                                    type="number"
                                                    value={item.discount}
                                                    onChange={(e) =>
                                                        updateItem(index, "discount", e.target.value)
                                                    }
                                                    className="w-20 input input-bordered input-sm"
                                                />
                                                <select
                                                    value={item.discount_type}   // ✅
                                                    onChange={(e) => updateItem(index, "discount_type", e.target.value)}
                                                >
                                                    <option value="percent">%</option>
                                                    <option value="amount">Rp</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>

                                            <select
                                                value={Number(item.tax)}   // 🚀 pastikan number
                                                onChange={(e) => updateItem(index, "tax", Number(e.target.value))}
                                            >
                                                <option value={0}>0%</option>
                                                <option value={11}>11% PPN</option>
                                                <option value={12}>12% PPN</option>
                                            </select>

                                        </td>
                                        <td className="text-right">{item.total.toLocaleString()}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" onClick={addItem} className="mt-2 btn btn-primary">
                        + Tambah Item
                    </button>
                </div>

                {/* Total */}
                <div className="p-4 space-y-2 shadow-inner card bg-base-200">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Diskon:</span>
                        <span className="font-semibold">-{totalDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Pajak:</span>
                        <span className="font-semibold">{totalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Ongkir:</span>
                        <input
                            type="number"
                            value={data.shipping_cost}
                            onChange={(e) => setData("shipping_cost", Number(e.target.value) || 0)}
                            className="w-20 text-right input input-bordered input-sm"
                        />
                    </div>
                    <div className="flex justify-between">
                        <span>Diskon Tambahan:</span>
                        <input
                            type="number"
                            value={data.extra_discount}
                            onChange={(e) => setData("extra_discount", Number(e.target.value) || 0)}
                            className="w-20 text-right input input-bordered input-sm"
                        />
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-bold border-t">
                        <span>Grand Total:</span>
                        <span>{grandTotal.toLocaleString()}</span>
                    </div>
                </div>

                {/* Keterangan */}
                <div className="form-control">
                    <label className="label">Keterangan</label>
                    <textarea
                        value={data.keterangan}
                        onChange={(e) => setData("keterangan", e.target.value)}
                        className="w-full textarea textarea-bordered"
                    />
                </div>

                {/* Terms & Signature */}
                <div className="form-control">
                    <label className="label">Syarat & Ketentuan</label>
                    <textarea
                        value={data.terms}
                        onChange={(e) => setData("terms", e.target.value)}
                        className="w-full textarea textarea-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">Tanda Tangan</label>

                    {data.signature_path && (
                        <div className="mb-2">
                            {data.signature_path instanceof File ? (
                                <img
                                    src={URL.createObjectURL(data.signature_path)}
                                    alt="New Signature"
                                    className="h-16"
                                />
                            ) : (
                                <img
                                    src={`/storage/${data.signature_path}`}
                                    alt="Existing Signature"
                                    className="h-16"
                                />
                            )}
                        </div>
                    )}


                    {/* Upload baru */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData("signature_path", e.target.files[0])}
                        className="w-full file-input file-input-bordered"
                    />
                </div>


                {/* Buttons */}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={preview} className="btn btn-secondary">
                        Preview
                    </button>
                    <button type="submit" disabled={processing} className="btn btn-success">
                        {processing ? "Menyimpan..." : "Update Invoice"}
                    </button>
                </div>
            </form>

            {/* Preview Modal */}
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
                                        const product = products.find((p) => p.id == i.product_id);
                                        const price = product?.prices.find((pr) => pr.id == i.price_id);
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
    );
}
