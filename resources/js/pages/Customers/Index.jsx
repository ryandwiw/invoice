import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Index() {
    const { customers } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Hapus customer ini?")) {
            destroy(`/customers/${id}`, {
                onSuccess: () => {
                    // opsional: bisa kasih toast atau refresh otomatis
                },
            });
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Customers</h1>
                <Link href="/customers/create" className="btn btn-primary">
                    Tambah Customer
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>Contact Person</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map((customer, index) => (
                            <tr key={customer.id}>
                                <th>{index + 1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.phone || "-"}</td>
                                <td>{customer.email || "-"}</td>
                                <td>{customer.address || "-"}</td>
                                <td>{customer.contact_person || "-"}</td>
                                <td className="space-x-2">
                                    <Link
                                        href={`/customers/${customer.id}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        Lihat
                                    </Link>
                                    <Link
                                        href={`/customers/${customer.id}/edit`}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
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
        </div>
    );
}
