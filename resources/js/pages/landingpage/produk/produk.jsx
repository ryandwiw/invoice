import { Link } from '@inertiajs/react'
import React from 'react'
import { LazyMotion, domAnimation, m, motion } from "framer-motion";

import Navbar from '../../../components/landingpage/Navbar'
import Footer from '../../../components/landingpage/Footer'

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};


const produk = () => {
    return (
        <div>
            <LazyMotion features={domAnimation}>
                <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
                    <Navbar />

                    <section className="relative px-4 py-5 overflow-hidden md:px-28">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute rounded-full -top-24 -left-24 h-72 w-72 opacity-30 blur-3xl bg-primary" />
                            <div className="absolute rounded-full -bottom-24 -right-24 h-72 w-72 opacity-30 blur-3xl bg-secondary" />
                        </div>

                        <div className="container px-6 py-20 mx-auto">
                            <motion.div initial="hidden" animate="show" variants={stagger} className="grid items-center gap-10 lg:grid-cols-2">
                                <motion.div variants={fadeUp}>
                                    <div className="mb-4 badge badge-outline badge-primary">SaaS Bisnis</div>
                                    <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                                        <span className="text-primary">Solusi Invoice Digital</span> Modern
                                    </h1>
                                    <p className="mt-5 text-lg opacity-80">
                                        Kami menyediakan platform pembuatan dan pengiriman <span className="font-semibold">invoice digital</span>
                                        yang profesional, aman, dan mudah digunakan. Dengan sistem ini, Anda dapat
                                        mengelola transaksi, menagih klien, serta memantau pembayaran secara real-time
                                        hanya dari satu dashboard.
                                    </p>
                                    <div className="flex flex-col gap-3 mt-8 sm:flex-row">
                                        <a href={route('login')} className="btn btn-primary btn-lg">Coba Sekarang</a>
                                    </div>


                                </motion.div>

                                <motion.div variants={fadeUp} className="relative">
                                    <div className="border shadow-xl mockup-window bg-base-300">
                                        <div className="px-6 py-8 bg-base-200">
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="p-4 shadow card bg-base-100">
                                                    <h3 className="font-semibold">Buat Invoice</h3>
                                                    <p className="text-sm opacity-70">Template profesional, logo, pajak otomatis.</p>
                                                </div>
                                                <div className="p-4 shadow card bg-base-100">
                                                    <h3 className="font-semibold">Terima Pembayaran</h3>
                                                    <p className="text-sm opacity-70">Transfer bank, virtual account, e-wallet.</p>
                                                </div>
                                                <div className="p-4 shadow card bg-base-100">
                                                    <h3 className="font-semibold">Rekonsiliasi Otomatis</h3>
                                                    <p className="text-sm opacity-70">Transaksi langsung tercatat rapi.</p>
                                                </div>
                                                <div className="p-4 shadow card bg-base-100">
                                                    <h3 className="font-semibold">e-Meterai</h3>
                                                    <p className="text-sm opacity-70">Pembubuhan e-meterai resmi lebih mudah.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>


                    {/* EDU SECTION: Apa itu Invoice? */}
                    <section className="py-20 bg-base-200">
                        <div className="container max-w-5xl px-6 mx-auto">
                            <m.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center">
                                <h2 className="text-3xl font-bold md:text-4xl">🔹 Apa Itu Invoice?</h2>
                                <p className="mt-4 text-lg opacity-80">
                                    Invoice adalah <span className="font-semibold">dokumen resmi tagihan</span> yang berisi rincian produk/jasa, kuantitas, harga, pajak, metode pembayaran, serta total yang harus dibayar.
                                    Dengan invoice, bisnis tampil <span className="font-semibold">profesional</span>, transaksi <span className="font-semibold">transparan</span>, dan pencatatan <span className="font-semibold">lebih rapi</span>.
                                </p>
                            </m.div>

                            {/* 3 Benefit Cards */}
                            <div className="grid gap-6 mt-10 md:grid-cols-3">
                                {[
                                    { title: 'Profesional & Kredibel', desc: 'Brand Anda terlihat serius di mata klien dengan dokumen tagihan resmi.' },
                                    { title: 'Kontrol Arus Kas', desc: 'Pantau tagihan, tenggat, dan status pembayaran secara real-time.' },
                                    { title: 'Hemat Waktu', desc: 'Template siap pakai + otomatisasi hitung subtotal, pajak, dan grand total.' },
                                ].map((card, i) => (
                                    <m.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 border shadow-xl bg-base-100 rounded-2xl border-base-300">
                                        <h3 className="text-lg font-semibold">{card.title}</h3>
                                        <p className="mt-2 opacity-80">{card.desc}</p>
                                    </m.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 1: Invoice Penjualan (Text kiri, Gambar kanan) */}
                    <section className="py-20 bg-base-100">
                        <div className="container flex flex-col items-center gap-12 px-6 mx-auto md:flex-row md:px-12">
                            {/* Text kiri */}
                            <div className="flex-1">
                                <m.h2 className="text-3xl font-bold md:text-4xl" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>📄 Invoice Penjualan</m.h2>
                                <m.p className="mt-4 text-lg opacity-80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                                    <span className="font-semibold">Invoice Penjualan</span> adalah invoice yang diterbitkan oleh penjual setelah transaksi dilakukan.
                                    Sistem kami memudahkan Anda membuat invoice <span className="font-semibold">hanya dengan 1 klik</span>, lengkap dengan perhitungan otomatis, penomoran cerdas, dan template profesional.
                                </m.p>

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

                    {/* SECTION 2: Kirim Invoice (Gambar kiri, Text kanan) */}
                    <section className="py-20 bg-base-200">
                        <div className="container flex flex-col-reverse items-center gap-12 px-6 mx-auto md:flex-row md:px-12">
                            {/* Gambar kiri */}
                            <div className="flex justify-center flex-1">
                                <m.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
                                    {/* Preview channel pengiriman */}
                                    <div className="p-6 border shadow-xl bg-base-100 rounded-2xl border-base-300">
                                        <h3 className="text-lg font-semibold">Pilih Channel Pengiriman</h3>
                                        <div className="grid grid-cols-1 gap-4 mt-4">
                                            <div className="p-4 border rounded-xl bg-base-200 border-base-300">
                                                <div className="font-medium">📱 WhatsApp</div>
                                                <div className="text-sm opacity-70">Masuk langsung ke chat klien dengan link pembayaran.</div>
                                            </div>
                                            <div className="p-4 border rounded-xl bg-base-200 border-base-300">
                                                <div className="font-medium">📧 Email</div>
                                                <div className="text-sm opacity-70">Lampiran PDF otomatis + pesan kustom.</div>
                                            </div>
                                            <div className="p-4 border rounded-xl bg-base-200 border-base-300">
                                                <div className="font-medium">📩 SMS</div>
                                                <div className="text-sm opacity-70">Jangkau klien tanpa internet.</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            <Link href="/invoice/send/whatsapp" className="rounded-full btn btn-success">Kirim via WhatsApp</Link>
                                            <Link href="/invoice/send/email" className="rounded-full btn btn-info">Kirim via Email</Link>
                                            <Link href="/invoice/send/sms" className="rounded-full btn btn-warning">Kirim via SMS</Link>
                                        </div>
                                    </div>
                                </m.div>
                            </div>

                            {/* Text kanan */}
                            <div className="flex-1">
                                <m.h2 className="text-3xl font-bold md:text-4xl" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>✉️ Kirim Invoice</m.h2>
                                <m.p className="mt-4 text-lg opacity-80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                                    <span className="font-semibold">Kirim Invoice</span> adalah fitur untuk menyampaikan invoice ke klien melalui berbagai kanal komunikasi.
                                    Tanpa batas kuota, tanpa biaya tambahan—cukup pilih kanal, tulis pesan, dan kirim.
                                </m.p>

                                {/* Bullets */}
                                <div className="grid gap-3 mt-6">
                                    {[
                                        'Gratis & tanpa batas: kirim sebanyak yang Anda perlukan.',
                                        'Template pesan siap pakai + personalisasi sapaan klien.',
                                        'Pelacakan status terkirim/dibaca + reminder otomatis sebelum jatuh tempo.',
                                        'Jejak audit lengkap untuk kepatuhan & dokumentasi.',
                                    ].map((t, i) => (
                                        <m.div key={i} initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3">
                                            <span className="inline-flex items-center justify-center w-6 h-6 mt-1 text-sm rounded-full bg-secondary text-secondary-content">✓</span>
                                            <p className="opacity-80">{t}</p>
                                        </m.div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <Link href="/invoice/send" className="px-6 rounded-full btn btn-secondary">Kirim Invoice Sekarang</Link>
                                    <Link href="/docs/kirim-invoice" className="px-6 rounded-full btn btn-outline">Pelajari Cara Kerja</Link>
                                </div>

                                {/* How it Works */}
                                <div className="grid gap-4 mt-8 md:grid-cols-3">
                                    {[
                                        { step: '1. Pilih Invoice', desc: 'Cari invoice dari daftar/tag — atau buat baru.' },
                                        { step: '2. Tentukan Channel', desc: 'WhatsApp, Email, atau SMS sesuai preferensi klien.' },
                                        { step: '3. Kirim & Lacak', desc: 'Pantau status terkirim/dibaca, tambah reminder otomatis.' },
                                    ].map((s, i) => (
                                        <m.div key={i} initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-4 border rounded-xl bg-base-100 border-base-300">
                                            <div className="font-semibold">{s.step}</div>
                                            <div className="text-sm opacity-70">{s.desc}</div>
                                        </m.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </LazyMotion>
        </div>
    )
}

export default produk
