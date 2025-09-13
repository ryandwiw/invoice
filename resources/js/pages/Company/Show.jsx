import React from "react";
import { Link, Head } from "@inertiajs/react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";


export default function Show({ company }) {
    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="max-w-2xl mx-auto p-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-4">
                            {company.logo_path ? (
                                <img
                                    src={`/storage/${company.logo_path}`}
                                    alt="logo"
                                    className="w-20 h-20 rounded"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                                    <span className="text-gray-500 text-sm">No Logo</span>
                                </div>
                            )}
                            <h2 className="card-title">{company.name}</h2>
                        </div>

                        <div className="space-y-2">
                            <p><strong>Alamat:</strong> {company.address}</p>
                            <p><strong>Kota:</strong> {company.city}</p>
                            <p><strong>Provinsi:</strong> {company.province}</p>
                            <p><strong>Kode Pos:</strong> {company.postal_code}</p>
                            <p><strong>Negara:</strong> {company.country}</p>
                            <p><strong>Telepon:</strong> {company.phone}</p>
                            <p><strong>Email:</strong> {company.email}</p>
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <Link
                                href={route("companies.edit", company.id)}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route("companies.index")}
                                className="btn"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ModernDashboardLayout >
    );
}
