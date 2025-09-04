import React from 'react'
import { Link } from "@inertiajs/react";

import { LazyMotion, domAnimation, m, motion } from "framer-motion";


const KirimInvoice = () => {
    return (
        <div>
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
                        <div className='text-center md:text-left'>
                            <m.h2 className="text-3xl font-bold md:text-4xl" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>✉️ Kirim Invoice</m.h2>
                            <m.p className="mt-4 text-lg opacity-80" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                                <span className="font-semibold">Kirim Invoice</span> adalah fitur untuk menyampaikan invoice ke klien melalui berbagai kanal komunikasi.
                                Tanpa batas kuota, tanpa biaya tambahan—cukup pilih kanal, tulis pesan, dan kirim.
                            </m.p>
                        </div>

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
        </div>
    )
}

export default KirimInvoice
