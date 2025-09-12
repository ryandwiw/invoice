import React from "react";
import { Link } from "@inertiajs/react";

export default function Show({ company }) {
  return (
    <div className="max-w-xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Detail Perusahaan</h1>
      <div className="p-6 shadow-md card bg-base-100">
        {company.logo_url && (
          <img
            src={company.logo_url}
            alt="Logo"
            className="object-contain w-32 h-32 mb-4"
          />
        )}
        <p><strong>Nama:</strong> {company.name}</p>
        <p><strong>Alamat:</strong> {company.address}</p>
        <p><strong>Telepon:</strong> {company.phone}</p>
        <p><strong>Email:</strong> {company.email}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Link href={route("companies.index")} className="btn">
          Kembali
        </Link>
        <Link href={route("companies.edit", company.id)} className="btn btn-info">
          Edit
        </Link>
      </div>
    </div>
  );
}
