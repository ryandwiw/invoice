import React, { useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        sku: "",
        name: "",
        description: "",
        pieces_per_carton: 1,
        prices: [{ label: "", unit: "pcs", price: 0, min_qty: 1 }],
        stocks: [
            { unit: "carton", quantity: 0 },
            { unit: "pcs", quantity: 0 },
        ],
        stock_quantity: 0,
    });

    // Hitung total stok dalam pcs
    const totalPcs = (data.stocks || []).reduce((sum, s) => {
        if (s.unit === "carton") {
            return sum + Number(s.quantity || 0) * Number(data.pieces_per_carton);
        }
        return sum + Number(s.quantity || 0);
    }, 0);

    useEffect(() => {
        setData("stock_quantity", totalPcs);
    }, [data.stocks, data.pieces_per_carton]);

    const addPrice = () => {
        setData("prices", [...data.prices, { label: "", unit: "pcs", price: 0, min_qty: 1 }]);
    };

    const addStock = () => {
        setData("stocks", [...data.stocks, { unit: "pcs", quantity: 0 }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <div className="max-w-3xl p-6 mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Tambah Produk</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* SKU */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">SKU Produk</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Contoh: PPK001"
                        value={data.sku}
                        onChange={(e) => setData("sku", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.sku && <span className="text-error">{errors.sku}</span>}
                </div>

                {/* Nama */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nama Produk</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Contoh: Pupuk Ambition"
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
                        placeholder="Keterangan tambahan produk"
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
                                placeholder={`Jumlah ${s.unit}`}
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

                    {/* Tombol tambah stok: hanya tampil jika stok < 2 */}
                    {data.stocks.length < 2 && (
                        <button
                            type="button"
                            onClick={() => setData("stocks", [...data.stocks, { unit: "pcs", quantity: 0 }])}
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
                                placeholder="Contoh: Grosir, Eceran"
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
                                placeholder="Min"
                                value={price.min_qty}
                                onChange={(e) => {
                                    const newPrices = [...data.prices];
                                    newPrices[i].min_qty = e.target.value;
                                    setData("prices", newPrices);
                                }}
                                className="input input-bordered"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Harga"
                                    value={price.price}
                                    onChange={(e) => {
                                        const newPrices = [...data.prices];
                                        newPrices[i].price = e.target.value;
                                        setData("prices", newPrices);
                                    }}
                                    className="flex-1 input input-bordered"
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
