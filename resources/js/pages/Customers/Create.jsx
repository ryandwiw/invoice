import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Combobox } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  LocateFixed,
  Map,
  Mail,
  Phone,
  Image as ImageIcon,
  ArrowLeft,
  Save,
} from "lucide-react";
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
    country: "Indonesia",
    phone: "",
    email: "",
    logo_path: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [liveErrors, setLiveErrors] = useState({ phone: null, email: null });

  const validateForm = () => {
    if (!data.name.trim()) return "Nama perusahaan Client wajib diisi.";
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
    post(route("customers.store"), {
      onSuccess: () => {
        setMessage({ type: "success", text: "Perusahaan Client berhasil disimpan." });
        reset();
        setPreview(null);
        setLiveErrors({ phone: null, email: null });
      },
      onError: () =>
        setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." }),
    });
  };

  const ComboboxInput = ({ label, icon: Icon, value, onChange, options, placeholder, error }) => {
    const [query, setQuery] = useState(value || "");
    const filtered =
      query === ""
        ? options
        : options.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

    return (
      <div className="form-control">
        <label className="label gap-2 font-semibold text-sm ">
          <Icon className="w-4 h-4 text-cyan-400" /> {label}
        </label>
        <Combobox
          value={value}
          onChange={(val) => {
            setQuery(val);
            onChange(val);
          }}
        >
          <div className="relative">
            <Combobox.Input
              className="input input-bordered w-full"
              placeholder={placeholder}
              displayValue={() => query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => onChange(query)}
            />
            {filtered.length > 0 && (
              <Combobox.Options className="absolute z-10 w-full mt-1 bg-base-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filtered.map((item, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={item}
                    className={({ active }) =>
                      `cursor-pointer select-none p-2 ${
                        active ? "bg-primary text-white" : ""
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
        {error && <span className="text-error text-sm">{error}</span>}
      </div>
    );
  };

  return (
    <ModernDashboardLayout>
      <Head title="Tambah Client" />
      <div className="max-w-6xl mx-auto p-3">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="card bg-base-100/50 backdrop-blur-lg shadow-xl border border-base-300 p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="w-7 h-7 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Tambah Client
              </span>
            </h1>
            <Link href={route("customers.index")} className="btn btn-primary gap-2">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
          </div>

          {message && (
            <div
              className={`alert mb-4 ${message.type === "success" ? "alert-success" : "alert-error"}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label gap-2 font-semibold text-sm ">
                <Building2 className="w-4 h-4 text-purple-400" /> Nama Client
              </label>
              <input
                type="text"
                placeholder="Contoh: PT. Ambition"
                className="input input-bordered w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name && <span className="text-error text-sm">{errors.name}</span>}
            </div>

            <div className="form-control">
              <label className="label gap-2 font-semibold text-sm ">
                <MapPin className="w-4 h-4 text-pink-400" /> Alamat
              </label>
              <textarea
                placeholder="Alamat Jalan lengkap (tanpa kota, provinsi, kode pos)"
                className="textarea textarea-bordered w-full"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
              />
              {errors.address && <span className="text-error text-sm">{errors.address}</span>}
            </div>

            <ComboboxInput
              label="Kota"
              icon={LocateFixed}
              value={data.city}
              onChange={(val) => setData("city", val)}
              options={cityOptions}
              placeholder="Ketik atau pilih kota"
              error={errors.city}
            />
            <ComboboxInput
              label="Provinsi"
              icon={Map}
              value={data.province}
              onChange={(val) => setData("province", val)}
              options={provinceOptions}
              placeholder="Ketik atau pilih provinsi"
              error={errors.province}
            />
            <ComboboxInput
              label="Kode Pos"
              icon={MapPin}
              value={data.postal_code}
              onChange={(val) => setData("postal_code", val)}
              options={postalCodeOptions}
              placeholder="Masukkan kode pos"
              error={errors.postal_code}
            />

            <input type="hidden" value={data.country} name="country" />

            {/* Nomor HP */}
            <div className="form-control">
              <label className="label gap-2 font-semibold text-sm ">
                <Phone className="w-4 h-4 text-cyan-400" /> Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="Contoh: 081234567890"
                className="input input-bordered w-full"
                value={data.phone}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  let warning = null;
                  if (val && !/^(0|62)/.test(val)) warning = "Nomor HP harus diawali 0 atau 62.";
                  else if (val.length > 15) {
                    warning = "Nomor HP maksimal 15 digit.";
                    val = val.slice(0, 15);
                  } else if (val && val.length < 9) warning = "Nomor HP minimal 9 digit.";
                  setLiveErrors((prev) => ({ ...prev, phone: warning }));
                  setData("phone", val);
                }}
              />
              {(errors.phone || liveErrors.phone) && (
                <span className="text-error text-sm">{errors.phone || liveErrors.phone}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label gap-2 font-semibold text-sm ">
                <Mail className="w-4 h-4 text-emerald-400" /> Email
              </label>
              <input
                type="email"
                placeholder="Contoh: info@perusahaan.com"
                className="input input-bordered w-full"
                value={data.email}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    setLiveErrors((prev) => ({ ...prev, email: "Format email tidak valid." }));
                  } else {
                    setLiveErrors((prev) => ({ ...prev, email: null }));
                  }
                  setData("email", val);
                }}
              />
              {(errors.email || liveErrors.email) && (
                <span className="text-error text-sm">{errors.email || liveErrors.email}</span>
              )}
            </div>

            {/* Logo */}
            <div className="form-control">
              <label className="label gap-2 font-semibold text-sm ">
                <ImageIcon className="w-4 h-4 text-yellow-400" /> Logo Perusahaan Client
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setData("logo_path", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && <img src={preview} alt="Preview" className="w-24 h-24 mt-2 rounded-lg" />}
              {errors.logo_path && <span className="text-error text-sm">{errors.logo_path}</span>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Link href={route("customers.index")} className="btn btn-ghost gap-2">
                <ArrowLeft className="w-4 h-4" /> Batal
              </Link>
              <button type="submit" className="btn btn-primary gap-2 shadow-lg shadow-primary/40">
                <Save className="w-4 h-4" /> Simpan
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </ModernDashboardLayout>
  );
}
