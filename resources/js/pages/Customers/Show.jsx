import React from "react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";
import { Link, Head } from "@inertiajs/react";

export default function Show({ customer }) {
    return (
        <ModernDashboardLayout>
            <Head title="Dashboard" />
            <div className="max-w-2xl mx-auto p-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-4">
                            {customer.logo_path ? (
                                <img
                                    src={`/storage/${customer.logo_path}`}
                                    alt="logo"
                                    className="w-20 h-20 rounded"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                                    <span className="text-gray-500 text-sm">No Logo</span>
                                </div>
                            )}
                            <h2 className="card-title">{customer.name}</h2>
                        </div>

                        <div className="space-y-2">
                            <p><strong>Alamat:</strong> {customer.address}</p>
                            <p><strong>Kota:</strong> {customer.city}</p>
                            <p><strong>Provinsi:</strong> {customer.province}</p>
                            <p><strong>Kode Pos:</strong> {customer.postal_code}</p>
                            <p><strong>Negara:</strong> {customer.country}</p>
                            <p><strong>Telepon:</strong> {customer.phone}</p>
                            <p><strong>Email:</strong> {customer.email}</p>
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <Link
                                href={route("customers.edit", customer.id)}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route("customers.index")}
                                className="btn"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ModernDashboardLayout>
    );
}
