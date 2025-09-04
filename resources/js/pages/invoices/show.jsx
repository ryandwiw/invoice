import React from "react";
import { usePage, Link, router } from "@inertiajs/react";

// Helper format rupiah
const formatRupiah = (angka) => {
  if (!angka) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

// Badge status
const StatusBadge = ({ status }) => {
  let color = "bg-gray-200 text-gray-700";
  if (status === "Lunas") color = "bg-green-100 text-green-700";
  else if (status === "Pending") color = "bg-yellow-100 text-yellow-700";
  else if (status === "Overdue") color = "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

export default function Show() {
  const { invoice } = usePage().props;

  const handleDelete = () => {
    if (confirm("Yakin mau hapus invoice ini?")) {
      router.delete(route("invoices.destroy", invoice.id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoice #{invoice.id}</h1>
        <StatusBadge status={invoice.status} />
      </div>

      {/* Info Client */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Client</h2>
        <p><strong>Nama:</strong> {invoice.company_profile_tujuan}</p>
        <p><strong>Email:</strong> {invoice.company_email_tujuan ?? "-"}</p>
        <p><strong>Telepon:</strong> {invoice.company_phone_tujuan ?? "-"}</p>
        <p><strong>Alamat:</strong> {invoice.company_address_tujuan ?? "-"}</p>
      </div>

      {/* Info Invoice */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Detail Invoice</h2>
        <p><strong>Tanggal Invoice:</strong> {invoice.invoice_date}</p>
        <p><strong>Jatuh Tempo:</strong> {invoice.due_date ?? "-"}</p>
        <p className="text-lg font-bold mt-2">
          <strong>Total:</strong> {formatRupiah(invoice.total)}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Item</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Nama</th>
              <th className="px-4 py-2 border-b">Qty</th>
              <th className="px-4 py-2 border-b">Harga</th>
              <th className="px-4 py-2 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{it.name}</td>
                <td className="px-4 py-2 border-b">{it.qty}</td>
                <td className="px-4 py-2 border-b">{formatRupiah(it.price)}</td>
                <td className="px-4 py-2 border-b">
                  {formatRupiah(it.qty * it.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action */}
      <div className="flex gap-3">
        <Link
          href={route("invoices.index")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Kembali
        </Link>
        <Link
          href={route("invoices.edit", invoice.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
