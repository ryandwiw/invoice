
import React from "react";
import { LazyMotion, domAnimation, m, motion } from "framer-motion";

import Footer from "../../../components/landingpage/Footer";
import Navbar from "../../../components/landingpage/Navbar";
import InvoicePenjualan from "../../../components/landingpage/invoice/invoice-penjualan";

const fadeUp = {
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

export default function SaaSLanding() {
    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-base-100 text-base-content">
                <Navbar />

                {/* HERO */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute rounded-full -top-24 -left-24 h-72 w-72 opacity-30 blur-3xl bg-primary" />
                        <div className="absolute rounded-full -bottom-24 -right-24 h-72 w-72 opacity-30 blur-3xl bg-secondary" />
                    </div>

                    <div className="container px-6 py-16 mx-auto mt-12 md:py-24 md:px-24">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={stagger}
                            className="grid items-center gap-10 lg:grid-cols-2"
                        >
                            <motion.div variants={fadeUp} className="px-2 text-center md:text-left">
                                <div className="mb-4 badge badge-outline badge-primary">
                                    SaaS Bisnis
                                </div>
                                <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                                    Kelola Invoice & Pembayaran{" "}
                                    <span className="text-primary">lebih cepat</span> dan{" "}
                                    <span className="text-secondary">terintegrasi</span>
                                </h1>
                                <p className="mt-5 text-lg opacity-80">
                                    Platform CV Mata Timur Nusantara membantu UMKM hingga perusahaan
                                    berkembang untuk membuat invoice, menerima pembayaran, dan
                                    merapikan keuangan—semua dari satu dashboard.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="relative">
                                <div className="border shadow-xl mockup-window bg-base-300">
                                    <div className="px-6 py-8 bg-base-200">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="p-4 shadow card bg-base-100">
                                                <h3 className="font-semibold">Buat Invoice</h3>
                                                <p className="text-sm opacity-70">
                                                    Template profesional, logo, pajak otomatis.
                                                </p>
                                            </div>
                                            <div className="p-4 shadow card bg-base-100">
                                                <h3 className="font-semibold">Terima Pembayaran</h3>
                                                <p className="text-sm opacity-70">
                                                    Transfer bank, virtual account, e-wallet.
                                                </p>
                                            </div>
                                            <div className="p-4 shadow card bg-base-100">
                                                <h3 className="font-semibold">Rekonsiliasi Otomatis</h3>
                                                <p className="text-sm opacity-70">
                                                    Transaksi langsung tercatat rapi.
                                                </p>
                                            </div>
                                            <div className="p-4 shadow card bg-base-100">
                                                <h3 className="font-semibold">e-Meterai</h3>
                                                <p className="text-sm opacity-70">
                                                    Pembubuhan e-meterai resmi lebih mudah.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* STATS */}
                    <section>
                        <div className="container px-6 mx-auto md:px-24">
                            <div className="grid gap-6 text-center md:grid-cols-3">
                                {[
                                    { value: "100%", label: "Mengurangi human error" },
                                    { value: "45–65%", label: "Biaya operasional berkurang" },
                                    { value: "75%", label: "Pengelolaan lebih cepat" },
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className="border card bg-base-200 border-base-300"
                                    >
                                        <div className="card-body">
                                            <div className="text-4xl font-extrabold">{s.value}</div>
                                            <div className="opacity-70">{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-center opacity-60">
                                *Estimasi internal berdasarkan implementasi klien.
                            </p>
                        </div>
                    </section>
                </section>

                {/* FEATURES */}
                <section id="features" className="py-20">
                    <div className="container px-6 mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={stagger}
                        >
                            <motion.h2
                                variants={fadeUp}
                                className="text-3xl font-bold text-center md:text-4xl"
                            >
                                Semua yang Anda Butuhkan
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                className="max-w-2xl mx-auto mt-3 text-center opacity-70"
                            >
                                Dari pembuatan invoice hingga pencairan dana—otomatis, cepat, dan
                                aman.
                            </motion.p>

                            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    {
                                        title: "Invoice Digital",
                                        desc: "Buat invoice tanpa batas, lengkap dengan logo & nomor otomatis.",
                                        icon: "🧾",
                                    },
                                    {
                                        title: "Pengingat Pembayaran",
                                        desc: "Notifikasi otomatis agar tagihan dibayar tepat waktu.",
                                        icon: "⏰",
                                    },
                                    {
                                        title: "Mass Invoicing",
                                        desc: "Buat ratusan invoice sekaligus dalam menit.",
                                        icon: "⚡",
                                    },
                                ].map((f, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        className="transition-shadow border shadow-sm card bg-base-100 border-base-300 hover:shadow-xl"
                                    >
                                        <div className="card-body">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{f.icon}</div>
                                                <h3 className="text-xl card-title">{f.title}</h3>
                                            </div>
                                            <p className="opacity-80">{f.desc}</p>
                                            <div className="pt-2 card-actions">
                                                <button className="btn btn-sm btn-outline">
                                                    Selengkapnya
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <InvoicePenjualan />

                {/* CTA */}
                <section className="py-16">
                    <div className="container px-6 mx-auto">
                        <div className="shadow-xl card bg-gradient-to-r from-primary to-secondary text-primary-content">
                            <div className="card-body md:flex md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-2xl font-extrabold md:text-3xl">
                                        Siap mempercepat arus kas bisnis?
                                    </h3>
                                    <p className="opacity-90">
                                        Mulai gratis hari ini dan rasakan proses penagihan yang lebih
                                        sederhana.
                                    </p>
                                </div>
                                <div className="flex gap-3 mt-4 md:mt-0">
                                    <a className="btn">Coba Gratis</a>
                                    <a className="btn btn-outline">Jadwalkan Demo</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </LazyMotion>
    );
}
