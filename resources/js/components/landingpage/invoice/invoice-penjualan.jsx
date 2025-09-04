import { Link } from "@inertiajs/react";
import { LazyMotion, domAnimation, m, motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};


const InvoicePenjualan = () => {
    return (
        <div>
            <section className="py-12 md:py-20 bg-base-100">
                <div className="container flex flex-col items-center gap-12 px-6 mx-auto md:flex-row md:px-12">
                    {/* Text kiri */}
                    <div className="flex-1">
                        <div className="text-center md:text-left">
                            <m.h2 className="text-3xl font-bold md:text-4xl" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>📄 Invoice Penjualan</m.h2>
                            <m.p className="mt-4 text-lg opacity-80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                                <span className="font-semibold">Invoice Penjualan</span> adalah invoice yang diterbitkan oleh penjual setelah transaksi dilakukan.
                                Sistem kami memudahkan Anda membuat invoice <span className="font-semibold">hanya dengan 1 klik</span>, lengkap dengan perhitungan otomatis, penomoran cerdas, dan template profesional.
                            </m.p>
                        </div>

                        {/* Bullets */}
                        <div className="grid gap-3 mt-6">
                            {[
                                'Template profesional yang bisa dikustom (logo, warna, catatan).',
                                'Otomatis hitung subtotal, PPN/PPH, diskon, dan grand total.',
                                'Nomor invoice otomatis + pengaturan prefix/suffix (mis. INV-2025-001).',
                                'Mendukung multi-mata uang dan format tanggal lokal (ID).',
                                'Riwayat transaksi tersimpan rapi; ekspor PDF/CSV kapan saja.',
                                'Status invoice: Draft, Terkirim, Dibayar, Jatuh Tempo, Lunas.',
                            ].map((t, i) => (
                                <m.div key={i} initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mt-1 text-sm rounded-full bg-primary text-primary-content">✓</span>
                                    <p className="opacity-80">{t}</p>
                                </m.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href={route('login')} className="px-6 rounded-full btn btn-primary">Buat Invoice Sekarang</Link>
                            <Link href={route('invoice-penjualan')} className="px-6 rounded-full btn btn-outline">Lihat Contoh & Panduan</Link>
                        </div>

                        {/* Mini-Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3">
                            {[
                                { k: '⏱️ 80% lebih cepat', v: 'dibanding manual Excel' },
                                { k: '🔒 Enkripsi', v: 'data & dokumen tersimpan aman' },
                                { k: '📥 PDF/CSV', v: 'unduh & kirim instan' },
                            ].map((s, i) => (
                                <m.div key={i} initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-4 border rounded-xl bg-base-200 border-base-300">
                                    <div className="text-base font-semibold">{s.k}</div>
                                    <div className="text-sm opacity-70">{s.v}</div>
                                </m.div>
                            ))}
                        </div>
                    </div>

                    {/* Gambar kanan */}
                    <div className="flex justify-center flex-1">
                        <m.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
                            {/* Invoice Card Preview (tetap elegan) */}
                            <div className="p-6 border shadow-xl bg-base-100 rounded-2xl border-base-300">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Invoice #INV-2025-001</h3>
                                    <span className="text-sm opacity-70">03 September 2025</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Produk</th>
                                                <th>Qty</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Lisensi Software Invoice</td>
                                                <td>1</td>
                                                <td>Rp 1.500.000</td>
                                                <td>Rp 1.500.000</td>
                                            </tr>
                                            <tr>
                                                <td>Custom Branding</td>
                                                <td>1</td>
                                                <td>Rp 500.000</td>
                                                <td>Rp 500.000</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan={3} className="text-right">Grand Total</th>
                                                <th>Rp 2.000.000</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 mt-8 md:justify-start">
                                    <Link href="/download/invoice/INV-2025-001" className="px-6 rounded-full btn btn-primary">Download PDF</Link>
                                    <Link href="/invoice/INV-2025-001" className="px-6 rounded-full btn btn-outline">Lihat Detail</Link>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InvoicePenjualan
