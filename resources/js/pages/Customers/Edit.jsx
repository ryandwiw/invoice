import React from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Edit({ customer }) {
    const { data, setData, put, errors } = useForm({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        contact_person: customer.contact_person,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/customers/${customer.id}`);
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Edit Customer</h1>
            <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
                {/* fields sama seperti Create.jsx */}
                <div>
                    <label className="label">Nama</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.name && <span className="text-error">{errors.name}</span>}
                </div>
                <div>
                    <label className="label">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.phone && <span className="text-error">{errors.phone}</span>}
                </div>
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.email && <span className="text-error">{errors.email}</span>}
                </div>
                <div>
                    <label className="label">Alamat</label>
                    <textarea
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="w-full textarea textarea-bordered"
                    ></textarea>
                    {errors.address && <span className="text-error">{errors.address}</span>}
                </div>
                <div>
                    <label className="label">Contact Person</label>
                    <input
                        type="text"
                        value={data.contact_person}
                        onChange={(e) => setData("contact_person", e.target.value)}
                        className="w-full input input-bordered"
                    />
                    {errors.contact_person && <span className="text-error">{errors.contact_person}</span>}
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link href="/customers" className="btn btn-ghost">Batal</Link>
                </div>
            </form>
        </div>
    );
}
