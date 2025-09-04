"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/landingpage/Footer";
import Navbar from "../../components/landingpage/Navbar";

// Component AboutUs dengan desain HD elegan
export default function AboutUs() {
    const team = [
        {
            name: "Arief Pratama",
            role: "Direktur Utama",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
            bio: "Memimpin visi dan strategi digital CV Mata Timur Nusantara sejak 2018.",
        },
        {
            name: "Siti Ramadhani",
            role: "Head of Product",
            img: "https://images.unsplash.com/photo-1545996124-1b3d6f4a1f9b?auto=format&fit=crop&w=400&q=60",
            bio: "Bertanggung jawab atas pengembangan fitur-fitur invoice dan pengalaman pengguna.",
        },
        {
            name: "Budi Santoso",
            role: "Lead Engineer",
            img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
            bio: "Membangun arsitektur front-end & integrasi dengan API Laravel.",
        },
    ];

    const stats = [
        { label: "Client Terdaftar", value: "1.250+" },
        { label: "Faktur Terbit", value: "45.300+" },
        { label: "Tingkat Kepuasan", value: "98%" },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-base-100 text-base-content">
            <Navbar/>
            {/* HERO */}
            <section className="relative py-24 md:py-36">
                <div className="container grid items-center gap-12 px-6 mx-auto lg:px-20 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                            Tentang CV Mata Timur Nusantara
                        </h1>
                        <p className="max-w-2xl mt-6 text-lg opacity-80">
                            Kami menyediakan solusi invoice digital yang sederhana, aman, dan
                            sesuai regulasi untuk UKM dan perusahaan menengah. Fokus kami:
                            otomatisasi, kemudahan pelaporan, dan integrasi dengan sistem
                            akuntansi Anda.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <a href="#contact" className="shadow-lg btn btn-primary btn-lg">
                                Hubungi Kami
                            </a>
                            <a href="#features" className="btn btn-outline btn-lg">
                                Lihat Fitur
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-8 mt-10">
                            {stats.map((s) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-bold text-primary">
                                        {s.value}
                                    </div>
                                    <div className="text-sm opacity-70">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="order-first lg:order-last"
                    >
                        <div className="transition-all duration-500 shadow-2xl card bg-base-200 hover:shadow-primary/30">
                            <figure className="p-6">
                                <img
                                    src="https://images.unsplash.com/photo-1581091012184-7f1f3a7b3f9b?auto=format&fit=crop&w=800&q=60"
                                    alt="Aplikasi Invoice"
                                    className="shadow-lg rounded-2xl"
                                />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">Aman & Terintegrasi</h3>
                                <p className="opacity-80">
                                    Dibangun untuk mempermudah proses penagihan, pencatatan pajak,
                                    dan pelaporan keuangan.
                                </p>
                                <div className="justify-end card-actions">
                                    <span className="badge badge-outline">Integrasi API</span>
                                    <span className="badge badge-outline">Sistem Backup</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ornament background */}
                <div className="absolute -top-32 -right-40 w-[28rem] h-[28rem] bg-gradient-to-tr from-primary to-secondary opacity-20 blur-3xl rounded-full"></div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-20">
                <div className="container grid items-center gap-12 px-6 mx-auto lg:px-20 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold">Ingin Demo atau Konsultasi?</h3>
                        <p className="mt-3 text-sm opacity-80">
                            Hubungi tim kami untuk demo gratis dan konsultasi implementasi ke
                            sistem Anda.
                        </p>
                        <a href="/demo" className="mt-6 btn btn-primary">
                            Minta Demo
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="p-8 shadow-xl card bg-base-200"
                    >
                        <h4 className="text-lg font-semibold">Alamat Kantor</h4>
                        <p className="mt-2 text-sm opacity-80">
                            Jl. Sudirman No.45, Surabaya, Jawa Timur
                        </p>

                        <form className="grid gap-4 mt-6">
                            <input
                                type="text"
                                placeholder="Nama"
                                className="w-full input input-bordered"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full input input-bordered"
                            />
                            <textarea
                                placeholder="Pesan singkat"
                                className="w-full textarea textarea-bordered"
                                rows={4}
                            ></textarea>
                            <button type="submit" className="w-full btn btn-primary">
                                Kirim
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
