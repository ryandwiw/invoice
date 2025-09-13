import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default function Index({ companies }) {
    const { flash } = usePage().props;

    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Perusahaan</h1>
                    <Link href={route("companies.create")} className="btn btn-primary">
                        + Tambah Perusahaan
                    </Link>
                </div>

                {flash?.success && (
                    <div className="alert alert-success mb-4">
                        {flash.success}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>Nama</th>
                                <th>Kota</th>
                                <th>Telepon</th>
                                <th>Email</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.data.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        Belum ada data perusahaan.
                                    </td>
                                </tr>
                            ) : (
                                companies.data.map((company, index) => (
                                    <tr key={company.id}>
                                        <td>{companies.from + index}</td>
                                        <td>
                                            {company.logo_path ? (
                                                <img
                                                    src={`/storage/${company.logo_path}`}
                                                    alt="logo"
                                                    className="w-12 h-12 rounded"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                                                    <span className="text-gray-500 text-xs">N/A</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>{company.name}</td>
                                        <td>{company.city}</td>
                                        <td>{company.phone}</td>
                                        <td>{company.email}</td>
                                        <td className="flex gap-2">
                                            <Link
                                                href={route("companies.show", company.id)}
                                                className="btn btn-sm btn-info"
                                            >
                                                Detail
                                            </Link>
                                            <Link
                                                href={route("companies.edit", company.id)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route("companies.destroy", company.id)}
                                                className="btn btn-sm btn-error"
                                                onClick={(e) => {
                                                    if (!confirm("Yakin hapus perusahaan ini?")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <div className="join">
                        {companies.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || "#"}
                                className={`join-item btn btn-sm ${link.active ? "btn-primary" : ""} ${!link.url ? "btn-disabled" : ""
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ModernDashboardLayout>

    );
}
