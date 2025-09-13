import React, { useState } from "react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";
import { useForm, Link, Head } from "@inertiajs/react";
import { Combobox } from "@headlessui/react";
import {
    cityOptions,
    provinceOptions,
    postalCodeOptions,
} from "@/components/Data/locationData";

export default function Edit({ customer }) {
    const { data, setData, post, errors, reset } = useForm({
        _method: "PUT",
        name: customer.name || "",
        address: customer.address || "",
        city: customer.city || "",
        province: customer.province || "",
        postal_code: customer.postal_code || "",
        country: customer.country || "Indonesia",
        phone: customer.phone || "",
        email: customer.email || "",
        logo_path: null,
    });

    const [preview, setPreview] = useState(
        customer.logo_path ? `/storage/${customer.logo_path}` : null
    );
    const [message, setMessage] = useState(null);
    const [liveErrors, setLiveErrors] = useState({
        phone: null,
        email: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("customers.update", customer.id), {
            onSuccess: () => {
                setMessage({ type: "success", text: "Data perusahaan berhasil diperbarui." });
                setLiveErrors({ phone: null, email: null });
            },
            onError: () => {
                setMessage({ type: "error", text: "Terjadi kesalahan saat memperbarui." });
            },
        });
    };

    // Reusable Combobox
    const ComboboxInput = ({ value, onChange, options, placeholder, error }) => {
        const [query, setQuery] = useState(value || "");
        const filtered =
            query === ""
                ? options
                : options.filter((item) =>
                    item.toLowerCase().includes(query.toLowerCase())
                );

        return (
            <div className="w-full relative">
                <Combobox
                    value={value}
                    onChange={(val) => {
                        setQuery(val);
                        onChange(val);
                    }}
                >
                    <div className="relative">
                        <Combobox.Input
                            className="w-full input input-bordered"
                            placeholder={placeholder}
                            displayValue={() => query}
                            onChange={(e) => setQuery(e.target.value)}
                            onBlur={() => onChange(query)}
                        />
                        {filtered.length > 0 && (
                            <Combobox.Options className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                                {filtered.map((item, idx) => (
                                    <Combobox.Option
                                        key={idx}
                                        value={item}
                                        className={({ active }) =>
                                            `cursor-pointer select-none p-2 ${active
                                                ? "bg-primary text-white"
                                                : "text-gray-900"
                                            }`
                                        }
                                    >
                                        {item}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                    </div>
                </Combobox>
                {error && <div className="text-red-500">{error}</div>}
            </div>
        );
    };

    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="max-w-xl p-6 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Edit Perusahaan</h1>

                {message && (
                    <div
                        className={`p-3 mb-4 rounded ${message.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {/* Nama */}
                    <input
                        type="text"
                        placeholder="Nama Perusahaan"
                        className="w-full input input-bordered"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}

                    {/* Alamat */}
                    <textarea
                        placeholder="Alamat Jalan lengkap (tanpa kota, provinsi, kode pos)"
                        className="w-full textarea textarea-bordered"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                    />
                    {errors.address && (
                        <div className="text-red-500">{errors.address}</div>
                    )}

                    {/* Kota */}
                    <ComboboxInput
                        value={data.city}
                        onChange={(val) => setData("city", val)}
                        options={cityOptions}
                        placeholder="Pilih atau ketik kota"
                        error={errors.city}
                    />

                    {/* Provinsi */}
                    <ComboboxInput
                        value={data.province}
                        onChange={(val) => setData("province", val)}
                        options={provinceOptions}
                        placeholder="Pilih atau ketik provinsi"
                        error={errors.province}
                    />

                    {/* Kode Pos */}
                    <ComboboxInput
                        value={data.postal_code}
                        onChange={(val) => setData("postal_code", val)}
                        options={postalCodeOptions}
                        placeholder="Masukkan kode pos"
                        error={errors.postal_code}
                    />

                    <input type="hidden" value={data.country} name="country" />

                    {/* Nomor HP */}
                    <input
                        type="text"
                        placeholder="Nomor Telepon (contoh: 081234567890)"
                        className="w-full input input-bordered"
                        value={data.phone}
                        onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            let warning = null;

                            if (val && !/^(0|62)/.test(val)) {
                                warning = "Nomor HP harus diawali 0 atau 62.";
                            } else if (val.length > 15) {
                                warning = "Nomor HP maksimal 15 digit.";
                                val = val.slice(0, 15);
                            } else if (val && val.length < 9) {
                                warning = "Nomor HP minimal 9 digit.";
                            }

                            setLiveErrors((prev) => ({ ...prev, phone: warning }));
                            setData("phone", val);
                        }}
                    />
                    {(errors.phone || liveErrors.phone) && (
                        <div className="text-red-500">
                            {errors.phone || liveErrors.phone}
                        </div>
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full input input-bordered"
                        value={data.email}
                        onChange={(e) => {
                            const val = e.target.value;

                            if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                                setLiveErrors((prev) => ({
                                    ...prev,
                                    email: "Format email tidak valid.",
                                }));
                            } else {
                                setLiveErrors((prev) => ({ ...prev, email: null }));
                            }

                            setData("email", val);
                        }}
                    />
                    {(errors.email || liveErrors.email) && (
                        <div className="text-red-500">
                            {errors.email || liveErrors.email}
                        </div>
                    )}

                    {/* Logo */}
                    <input
                        type="file"
                        className="w-full file-input file-input-bordered"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setData("logo_path", file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                    {preview && (
                        <img src={preview} alt="Preview" className="w-24 h-24 mt-2" />
                    )}
                    {errors.logo_path && (
                        <div className="text-red-500">{errors.logo_path}</div>
                    )}

                    {/* Tombol */}
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                        <Link href={route("customers.index")} className="btn">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </ModernDashboardLayout>

    );
}
