import React, { useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        sku: product.sku, // readonly
        name: product.name,
        description: product.description || "",
        pieces_per_carton: product.pieces_per_carton,
        prices: product.prices.map(p => ({
            label: p.label,
            unit: p.unit,
            price: p.price,
            min_qty: p.min_qty || 1,
        })),
        stocks: [
            { unit: "carton", quantity: Math.floor(product.stock.quantity_pcs / product.pieces_per_carton) },
            { unit: "pcs", quantity: product.stock.quantity_pcs % product.pieces_per_carton },
        ],
        stock_quantity: product.stock.quantity_pcs,
    });

    // Hitung total stok dalam pcs
    const totalPcs = (data.stocks || []).reduce((sum, s) => {
        if (s.unit === "carton") {
            return sum + Number(s.quantity || 0) * Number(data.pieces_per_carton);
        }
        return sum + Number(s.quantity || 0);
    }, 0);

    // Sync hasil perhitungan ke form
    useEffect(() => {
        setData("stock_quantity", totalPcs);
    }, [data.stocks, data.pieces_per_carton]);

    // Tambah baris harga
    const addPrice = () => {
        setData("prices", [...data.prices, { label: "", unit: "pcs", price: 0, min_qty: 1 }]);
    };

    // Tambah baris stok (maks 2 input)
    const addStock = () => {
        if (data.stocks.length < 2) {
            setData("stocks", [...data.stocks, { unit: "pcs", quantity: 0 }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("products.update", product.id));
    };

    return (
        <div className="max-w-3xl p-6 mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Edit Produk</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* SKU */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">SKU Produk</span>
                    </label>
                    <input
                        type="text"
                        value={data.sku}
                        readOnly
                        className="w-full bg-gray-100 cursor-not-allowed input input-bordered"
                    />
                </div>

                {/* Nama */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nama Produk</span>
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.name && <span className="text-error">{errors.name}</span>}
                </div>

                {/* Deskripsi */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deskripsi</span>
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full textarea textarea-bordered"
                    />
                </div>

                {/* Isi per Karton */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Isi per Karton</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={data.pieces_per_carton}
                        onChange={(e) => setData("pieces_per_carton", e.target.value)}
                        className="w-full input input-bordered"
                    />
                </div>

                {/* Stok Awal */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Stok Awal</span>
                    </label>
                    {data.stocks.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <select
                                value={s.unit}
                                onChange={(e) => {
                                    const newStocks = [...data.stocks];
                                    newStocks[i].unit = e.target.value;
                                    setData("stocks", newStocks);
                                }}
                                className="select select-bordered w-28"
                            >
                                <option value="carton">Karton</option>
                                <option value="pcs">Pcs</option>
                            </select>
                            <input
                                type="number"
                                min="0"
                                value={s.quantity}
                                onChange={(e) => {
                                    const newStocks = [...data.stocks];
                                    newStocks[i].quantity = e.target.value;
                                    setData("stocks", newStocks);
                                }}
                                className="w-full input input-bordered"
                            />
                            {data.stocks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newStocks = data.stocks.filter((_, idx) => idx !== i);
                                        setData("stocks", newStocks);
                                    }}
                                    className="btn btn-error btn-sm"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {data.stocks.length < 2 && (
                        <button
                            type="button"
                            onClick={addStock}
                            className="mt-2 btn btn-sm btn-outline"
                        >
                            + Tambah Baris Stok
                        </button>
                    )}
                    <label className="label">
                        <span className="label-text-alt">
                            Total stok awal: <b>{totalPcs} pcs</b>
                        </span>
                    </label>
                </div>

                {/* Harga */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Harga Produk</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-2 text-sm font-semibold">
                        <span>Label</span>
                        <span>Unit</span>
                        <span>Min Qty</span>
                        <span>Harga</span>
                    </div>
                    {data.prices.map((price, i) => (
                        <div key={i} className="grid items-center grid-cols-4 gap-2 mb-2">
                            <input
                                type="text"
                                value={price.label}
                                onChange={(e) => {
                                    const newPrices = [...data.prices];
                                    newPrices[i].label = e.target.value;
                                    setData("prices", newPrices);
                                }}
                                className="input input-bordered"
                            />
                            <select
                                value={price.unit}
                                onChange={(e) => {
                                    const newPrices = [...data.prices];
                                    newPrices[i].unit = e.target.value;
                                    setData("prices", newPrices);
                                }}
                                className="select select-bordered"
                            >
                                <option value="pcs">Per Pcs</option>
                                <option value="carton">Per Karton</option>
                            </select>
                            <input
                                type="number"
                                min="1"
                                value={price.min_qty}
                                onChange={(e) => {
                                    const newPrices = [...data.prices];
                                    newPrices[i].min_qty = e.target.value;
                                    setData("prices", newPrices);
                                }}
                                className="input input-bordered"
                            />
                            <input
                                type="number"
                                value={price.price}
                                onChange={(e) => {
                                    const newPrices = [...data.prices];
                                    newPrices[i].price = e.target.value;
                                    setData("prices", newPrices);
                                }}
                                className="input input-bordered"
                            />
                            {data.prices.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newPrices = data.prices.filter((_, idx) => idx !== i);
                                        setData("prices", newPrices);
                                    }}
                                    className="btn btn-error btn-sm"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <span className="text-xs text-gray-500">
                        Tambahkan harga berbeda untuk unit (pcs/karton) atau level grosir dengan minimal pembelian.
                    </span>
                    <button
                        type="button"
                        onClick={addPrice}
                        className="mt-2 btn btn-sm btn-outline"
                    >
                        + Tambah Harga
                    </button>
                </div>

                {/* Tombol */}
                <div className="flex justify-between mt-6">
                    <Link href={route("products.index")} className="btn btn-ghost">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn btn-primary"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
