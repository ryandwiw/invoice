import React from "react";
import { Link } from "@inertiajs/react";

export default function Show({ customer }) {
    return (
        <div className="max-w-lg p-6">
            <h1 className="mb-4 text-2xl font-bold">Detail Customer</h1>

            <div className="space-y-2">
                <div><strong>Nama:</strong> {customer.name}</div>
                <div><strong>Phone:</strong> {customer.phone || "-"}</div>
                <div><strong>Email:</strong> {customer.email || "-"}</div>
                <div><strong>Alamat:</strong> {customer.address || "-"}</div>
                <div><strong>Contact Person:</strong> {customer.contact_person || "-"}</div>
            </div>

            <div className="flex gap-2 mt-4">
                <Link href="/customers" className="btn btn-ghost">Kembali</Link>
                <Link href={`/customers/${customer.id}/edit`} className="btn btn-warning">Edit</Link>
            </div>
        </div>
    );
}
