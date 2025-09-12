import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function Index({ companies }) {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm("Yakin mau hapus perusahaan ini?")) {
      destroy(route("companies.destroy", id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Perusahaan</h1>
        <Link
          href={route("companies.create")}
          className="btn btn-primary"
        >
          Tambah Perusahaan
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {companies.data.map((company) => (
              <tr key={company.id}>
                <td>
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt="Logo"
                      className="object-contain w-12 h-12"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.phone}</td>
                <td>{company.email}</td>
                <td className="flex gap-2">
                  <Link
                    href={route("companies.show", company.id)}
                    className="btn btn-sm"
                  >
                    Detail
                  </Link>
                  <Link
                    href={route("companies.edit", company.id)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="btn btn-sm btn-error"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {companies.links.map((link, i) => (
          <Link
            key={i}
            href={link.url || "#"}
            className={`btn btn-sm ${link.active ? "btn-primary" : ""}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
}
