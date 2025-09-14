import React, { useEffect } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Hash,
    Tag,
    FileText,
    Package,
    Layers,
    Plus,
    X,
    Save,
    ArrowLeft,
} from "lucide-react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        sku: product.sku,
        name: product.name,
        description: product.description || "",
        pieces_per_carton: product.pieces_per_carton,
        prices: product.prices.map((p) => ({
            label: p.label,
            unit: p.unit,
            price: p.price,
            min_qty: p.min_qty || 1,
        })),
        stocks: [
            {
                unit: "carton",
                quantity: Math.floor(
                    product.stock.quantity_pcs / product.pieces_per_carton
                ),
            },
            {
                unit: "pcs",
                quantity: product.stock.quantity_pcs % product.pieces_per_carton,
            },
        ],
        stock_quantity: product.stock.quantity_pcs,
    });

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
        setData("prices", [
            ...data.prices,
            { label: "", unit: "pcs", price: 0, min_qty: 1 },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("products.update", product.id));
    };

    return (
        <ModernDashboardLayout>
            <Head title="Edit Produk" />

            <div className="max-w-6xl mx-auto p-3">
                <div className="card bg-base-100/50 backdrop-blur-lg shadow-xl border border-base-300 p-6 space-y-4">

                    {/* Header */}
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <Package className="w-7 h-7 text-emerald-500" />
                            <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                Edit Produk
                            </span>
                        </h1>

                        <Link
                            href={route("products.index")}
                            className="btn btn-primary shadow-md flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </Link>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Informasi Produk */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-primary hover:shadow-primary/50 transition-all p-6 space-y-4"
                        >
                            <h2 className="font-semibold text-lg flex items-center gap-2 text-emerald-400">
                                <FileText className="w-5 h-5" /> Informasi Produk
                            </h2>

                            {/* SKU (readonly) */}
                            <div className="form-control">
                                <label className="label gap-2">
                                    <Hash className="w-4 h-4" />
                                    <span className="label-text">SKU Produk</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.sku}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Nama */}
                            <div className="form-control">
                                <label className="label gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span className="label-text">Nama Produk</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && (
                                    <span className="text-error text-sm">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="form-control">
                                <label className="label gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span className="label-text">Deskripsi</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="textarea textarea-bordered w-full"
                                />
                            </div>
                        </motion.div>

                        {/* Stok */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-primary hover:shadow-primary/50 transition-all p-6 space-y-4"
                        >
                            <h2 className="font-semibold text-lg flex items-center gap-2 text-cyan-400">
                                <Layers className="w-5 h-5" /> Stok Produk
                            </h2>

                            {/* Isi per karton */}
                            <div className="form-control">
                                <label className="label">Isi per Karton</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.pieces_per_carton}
                                    onChange={(e) =>
                                        setData("pieces_per_carton", e.target.value)
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

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
                                        className="input input-bordered flex-1"
                                        placeholder={`Jumlah ${s.unit}`}
                                    />
                                    {data.stocks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newStocks = data.stocks.filter(
                                                    (_, idx) => idx !== i
                                                );
                                                setData("stocks", newStocks);
                                            }}
                                            className="btn btn-error btn-sm"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <p className="text-xs opacity-70">
                                Total stok:{" "}
                                <span className="font-semibold text-purple-400">
                                    {totalPcs}
                                </span>{" "}
                                pcs
                            </p>
                        </motion.div>

                        {/* Harga */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="card bg-base-200/50 backdrop-blur-lg shadow-xl border border-base-300 hover:border-primary hover:shadow-primary/50 transition-all p-6 space-y-4"
                        >
                            <h2 className="font-semibold text-lg flex items-center gap-2 text-pink-400">
                                <Tag className="w-5 h-5" /> Harga Produk
                            </h2>

                            <div className="grid grid-cols-4 gap-2 mb-2 text-sm font-semibold">
                                <span>Label</span>
                                <span>Unit</span>
                                <span>Min Qty</span>
                                <span>Harga</span>
                            </div>

                            {data.prices.map((price, i) => (
                                <div
                                    key={i}
                                    className="grid items-center grid-cols-4 gap-2 mb-2"
                                >
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
                                                    const newPrices = data.prices.filter(
                                                        (_, idx) => idx !== i
                                                    );
                                                    setData("prices", newPrices);
                                                }}
                                                className="btn btn-error btn-sm"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addPrice}
                                className="btn btn-warning btn-sm mt-2 flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Tambah Harga
                            </button>
                        </motion.div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-3 mt-6">
                            <Link href={route("products.index")} className="btn btn-ghost">
                                <ArrowLeft className="w-4 h-4" /> Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary flex gap-1 shadow-lg shadow-primary/40"
                            >
                                <Save className="w-4 h-4" /> Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModernDashboardLayout>
    );
}
