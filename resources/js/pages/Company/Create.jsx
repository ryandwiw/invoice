import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    name: "",
    address: "",
    phone: "",
    email: "",
    logo_path: null,
  });

  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("companies.store"));
  };

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Tambah Perusahaan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama"
          className="w-full input input-bordered"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <textarea
          placeholder="Alamat"
          className="w-full textarea textarea-bordered"
          value={data.address}
          onChange={(e) => setData("address", e.target.value)}
        />
        {errors.address && <div className="text-red-500">{errors.address}</div>}

        <input
          type="text"
          placeholder="Telepon"
          className="w-full input input-bordered"
          value={data.phone}
          onChange={(e) => setData("phone", e.target.value)}
        />
        {errors.phone && <div className="text-red-500">{errors.phone}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full input input-bordered"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}

        <input
          type="file"
          className="w-full file-input file-input-bordered"
          onChange={(e) => {
            setData("logo_path", e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
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
  );
}
