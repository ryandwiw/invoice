import React from "react";
import { motion as m } from "framer-motion";
import Navbar from "../../../components/landingpage/Navbar";
import Footer from "../../../components/landingpage/Footer";

export default function KebijakanPrivasi() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
            <Navbar />

            {/* Gradient blob pojok kanan atas */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-3xl -z-10 animate-pulse" />

            {/* Gradient blob pojok kiri bawah */}
            <div className="absolute bottom-0 left-0 rounded-full w-72 h-72 bg-gradient-to-tr from-accent via-secondary to-primary opacity-30 blur-3xl -z-10 animate-pulse" />

            <div className="container px-5 py-32 mx-auto md:px-24">
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="border shadow-xl card bg-base-100/70 backdrop-blur-md border-base-300 rounded-2xl"
                >
                    <div className="card-body">
                        <header className="text-center">
                            <h1 className="text-2xl font-bold">Kebijakan Privasi — Invoice</h1>
                            <p className="mt-1 text-sm text-muted">
                                Berlaku untuk data invoice yang dibuat, diproses, atau disimpan
                                oleh CV Mata Timur Nusantara
                            </p>
                        </header>
                        <hr className="border-t border-base-300" />

                        {/* Sections */}
                        {[
                            {
                                title: "1. Ringkasan Singkat",
                                content:
                                    "Kami menyimpan data invoice (mis. nama pelanggan, alamat, nomor NPWP, rincian barang/jasa, jumlah, tanggal, dan/atau bukti pembayaran) untuk mematuhi kewajiban hukum, akuntansi, dan fiskal. Data ini diproses hanya untuk tujuan yang jelas dan sah.",
                            },
                            {
                                title: "2. Jenis Data yang Dikumpulkan",
                                listType: "disc",
                                items: [
                                    "Identitas pelanggan (nama, alamat, kontak).",
                                    "Detail transaksi (nomor invoice, tanggal, item, jumlah).",
                                    "Informasi pajak yang relevan (NPWP, jenis pajak).",
                                    "Bukti pembayaran dan riwayat pembayaran.",
                                    "Data pendukung lain yang diperlukan untuk pemenuhan.",
                                ],
                            },
                            {
                                title: "3. Tujuan Pemrosesan",
                                listType: "decimal",
                                items: [
                                    "Memproses dan mengirimkan invoice kepada pelanggan.",
                                    "Memenuhi kewajiban perpajakan dan pelaporan keuangan.",
                                    "Mendukung proses penagihan dan rekonsiliasi keuangan.",
                                    "Audit internal dan kepatuhan hukum.",
                                ],
                            },
                            {
                                title: "4. Dasar Hukum",
                                content:
                                    "Pemrosesan data invoice didasarkan pada kewajiban kontraktual, kepatuhan terhadap peraturan perpajakan, dan kepentingan sah perusahaan untuk administrasi keuangan.",
                            },
                            {
                                title: "5. Retensi Data",
                                content:
                                    "Secara umum kami menyimpan catatan invoice sejak tanggal invoice, kecuali jika hukum mengharuskan periode yang lebih panjang atau jika pihak yang berkepentingan meminta penghapusan dan tidak ada kewajiban hukum yang mencegahnya.",
                            },
                            {
                                title: "6. Pihak yang Menerima Data",
                                listType: "disc",
                                items: [
                                    "Otoritas pajak atau regulator bila diminta oleh hukum.",
                                    "Konsultan pajak dan auditor eksternal untuk kepentingan audit.",
                                    "Penyedia layanan pembayaran dan penyimpanan dokumen jika diperlukan.",
                                ],
                            },
                            {
                                title: "7. Keamanan Data",
                                content:
                                    "Kami menerapkan langkah teknis dan organisasi untuk melindungi data invoice dari akses tidak sah, perubahan, dan kehilangan. Contoh: kontrol akses, enkripsi pada level penyimpanan atau transport, dan pencatatan akses.",
                            },
                            {
                                title: "8. Hak Subjek Data",
                                content:
                                    "Pemilik data memiliki hak untuk mengakses, memperbaiki, dan meminta penghapusan data (kecuali jika ada kewajiban hukum untuk menyimpannya). Untuk mengajukan permintaan, hubungi kami melalui email.",
                            },
                            {
                                title: "9. Perubahan pada Kebijakan",
                                content:
                                    "Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Setiap perubahan material akan diinformasikan melalui situs web atau pemberitahuan langsung sesuai kebutuhan.",
                            },
                        ].map((section, index) => (
                            <m.section
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="mt-4"
                            >
                                <h2 className="text-lg font-semibold">{section.title}</h2>
                                {section.content && <p className="mt-2">{section.content}</p>}
                                {section.items && (
                                    <ul
                                        className={`pl-5 mt-2 space-y-1 list-${section.listType}`}
                                    >
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </m.section>
                        ))}
                    </div>
                </m.div>
            </div>

            <Footer />
        </div>
    );
}
