"use client";

import React from "react";
import { FaFacebook, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function Footer() {
    const iconVariants = {
        hidden: { opacity: 0, x: -20, scale: 1.5 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
        }),
    };

    return (
        <footer className="relative overflow-hidden border-t text-base-content border-base-300">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-base-200/40 to-base-300/80 mix-blend-overlay"></div>

            <div className="relative max-w-screen-xl px-6 mx-auto sm:px-10 md:px-14 py-14">
                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="pb-10 border-b border-base-300"
                >
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                                Dapatkan Update Invoice
                            </h2>
                            <p className="text-sm md:text-base opacity-80">
                                Informasi terbaru seputar invoice di CV Mata Air Nusantara.
                            </p>
                        </div>

                        <div className="flex flex-col items-center w-full gap-3 mt-3 md:w-auto sm:flex-row md:mt-0">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="flex-1 w-full px-4 py-2 transition rounded-lg input input-bordered sm:w-auto focus:ring-2 focus:ring-primary"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-6 py-2 transition-transform rounded-lg shadow-md btn btn-primary hover:shadow-lg"
                            >
                                Berlangganan
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="grid grid-cols-1 gap-8 mt-12 text-center sm:grid-cols-2 md:grid-cols-5 sm:gap-10 sm:text-left"
                >
                    {/* Branding */}
                    <div className="space-y-4 md:col-span-2">
                        <h1 className="text-2xl font-bold md:text-3xl">CV Mata Air Nusantara</h1>
                        <p className="text-sm font-semibold md:text-base opacity-70">
                            Sistem Invoice & Manajemen Keuangan
                        </p>

                        {/* Social Icons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-4 sm:justify-start">
                            {[FaDiscord, FaGithub, FaTwitter, FaFacebook].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    custom={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.3 }}
                                    variants={iconVariants}
                                    className="p-2 transition-colors rounded-full bg-base-200 hover:bg-primary hover:text-white"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 gap-6 mt-8 md:col-span-3 sm:grid-cols-3 sm:gap-10 sm:mt-0">
                        {/* Quick Links */}
                        <div>
                            <h2 className="mb-3 font-bold">Quick Links</h2>
                            <ul className="space-y-2 text-sm font-semibold md:text-base opacity-70">
                                {[
                                    { name: "Beranda", href: route("home") },
                                    { name: "Produk", href: route("landing-produk") },
                                    { name: "Cara Kerja", href: route("cara-kerja") },
                                    { name: "Tentang Kami", href: route("about-us") },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="transition-colors duration-200 cursor-pointer hover:text-primary"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* Support */}
                        <div>
                            <h2 className="mb-3 font-bold">Produk Kami</h2>
                            <ul className="space-y-2 text-sm font-semibold md:text-base opacity-70">
                                {[
                                    { name: "Keseluruhan", href: route("landing-produk") },
                                    { name: "Invoice Penjualan", href: route("invoice-penjualan") },
                                    { name: "Kirim Invoice", href: route("kirim-invoice") },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="transition-colors duration-200 cursor-pointer hover:text-primary"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* FAQ / Legal */}
                        <div>
                            <h2 className="mb-3 font-bold">FAQ & Legal</h2>
                            <ul className="space-y-2 text-sm font-semibold md:text-base opacity-70">
                                {[
                                    { name: "Syarat & Ketentuan", href: route("syarat-ketentuan") },
                                    { name: "Kebijakan Privasi", href: route("kebijakan-privasi") },
                                    { name: "Site Map", href: route("sitemap") },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="transition-colors duration-200 cursor-pointer hover:text-primary"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="pt-6 mt-12 text-xs text-center border-t sm:text-sm border-base-300"
                >
                    <div className="opacity-70">© 2025 CV Mata Air Nusantara. All rights reserved.</div>
                </motion.div>
            </div>
        </footer>
    );
}
