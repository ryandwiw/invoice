import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Combobox } from "@headlessui/react";
import {
    cityOptions,
    provinceOptions,
    postalCodeOptions,
} from "@/components/Data/locationData";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Create() {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
        country: "Indonesia", // default
        phone: "",
        email: "",
        logo_path: null,
    });

    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null); // success / error info
    const [liveErrors, setLiveErrors] = useState({
        phone: null,
        email: null,
    });

    const validateForm = () => {
        if (!data.name.trim()) return "Nama perusahaan wajib diisi.";
        if (!data.address.trim()) return "Alamat wajib diisi.";

        if (data.city && !/^[A-Za-z\s]+$/.test(data.city))
            return "Nama kota hanya boleh huruf.";

        if (data.province && !/^[A-Za-z\s]+$/.test(data.province))
            return "Nama provinsi hanya boleh huruf.";

        if (data.postal_code && !/^\d+$/.test(data.postal_code))
            return "Kode pos hanya boleh angka.";

        if (
            data.phone &&
            !/^(0\d{8,15}|62\d{8,15})$/.test(data.phone.replace(/\s+/g, ""))
        )
            return "Nomor HP harus diawali 0 atau 62 dan panjang minimal 9 digit.";

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            return "Format email tidak valid.";

        if (
            data.logo_path &&
            !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
                data.logo_path.type
            )
        )
            return "Logo harus berupa file gambar (jpg, png, gif).";

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errorMsg = validateForm();
        if (errorMsg) {
            setMessage({ type: "error", text: errorMsg });
            return;
        }

        post(route("companies.store"), {
            onSuccess: () => {
                setMessage({ type: "success", text: "Perusahaan berhasil disimpan." });
                reset();
                setPreview(null);
                setLiveErrors({ phone: null, email: null });
            },
            onError: () => {
                setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
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
                <h1 className="mb-4 text-2xl font-bold">Tambah Perusahaan</h1>

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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nama Perusahaan"
                        className="w-full input input-bordered"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}

                    <textarea
                        placeholder="Alamat Jalan lengkap (tanpa kota, provinsi, kode pos)"
                        className="w-full textarea textarea-bordered"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                    />
                    {errors.address && (
                        <div className="text-red-500">{errors.address}</div>
                    )}

                    <ComboboxInput
                        value={data.city}
                        onChange={(val) => setData("city", val)}
                        options={cityOptions}
                        placeholder="Pilih atau ketik kota"
                        error={errors.city}
                    />

                    <ComboboxInput
                        value={data.province}
                        onChange={(val) => setData("province", val)}
                        options={provinceOptions}
                        placeholder="Pilih atau ketik provinsi"
                        error={errors.province}
                    />

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

                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Simpan
                        </button>
                        <Link href={route("companies.index")} className="btn">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </ModernDashboardLayout >

    );
}
