import { useState } from "react";
import {  FileText, TrendingUp, Download, ShieldCheck, Users, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Navbar2 from "../components/landingpage/navbar2";

export default function Test2() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">

        <Navbar2 darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-6 py-4 space-y-4">
            <a href="#features" className="block text-gray-700 dark:text-gray-200">Features</a>
            <a href="#pricing" className="block text-gray-700 dark:text-gray-200">Pricing</a>
            <a href="#about" className="block text-gray-700 dark:text-gray-200">About</a>
            <a href="#faq" className="block text-gray-700 dark:text-gray-200">FAQ</a>
            <a href="#contact" className="block text-gray-700 dark:text-gray-200">Contact</a>
            <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              <LogIn size={16}/> Login
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative text-center px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-green-50 to-transparent dark:from-blue-900/30 dark:via-green-900/20 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Kelola Invoice & Keuangan dengan Mudah
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
              InvoicePro membantu Anda membuat, mengelola, dan menganalisis keuangan bisnis
              dengan desain modern, laporan real-time, keamanan data, serta fitur kolaborasi tim.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700">
                Coba Gratis
              </button>
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-600">
                Lihat Demo
              </button>
            </div>

            {/* Mockup dashboard */}
            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Keuangan</h4>
                    <p className="text-gray-600 dark:text-gray-400">Agustus 2025</p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">+12% Growth</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pendapatan</p>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Rp 120jt</h5>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pengeluaran</p>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Rp 75jt</h5>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Invoice Aktif</p>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">34</h5>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="px-8 py-24 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Fitur Unggulan
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              title: "Invoice Otomatis",
              desc: "Buat dan kirim invoice profesional hanya dengan beberapa klik.",
              icon: FileText
            }, {
              title: "Laporan Real-time",
              desc: "Pantau pendapatan dan pengeluaran secara langsung.",
              icon: TrendingUp
            }, {
              title: "Ekspor PDF",
              desc: "Unduh invoice dalam format PDF yang rapi dan profesional.",
              icon: Download
            }, {
              title: "Keamanan Data",
              desc: "Data Anda terenkripsi dan aman dengan standar tinggi.",
              icon: ShieldCheck
            }, {
              title: "Kolaborasi Tim",
              desc: "Tambahkan anggota tim untuk mengelola keuangan bersama.",
              icon: Users
            }, {
              title: "Multi-Currency",
              desc: "Dukungan berbagai mata uang untuk bisnis global.",
              icon: FileText
            }].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <f.icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{f.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-8 py-24">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Paket Harga
          </h3>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[{
              plan: "Gratis",
              price: "Rp 0",
              features: ["5 Invoice per bulan", "1 Pengguna", "Support Email"]
            }, {
              plan: "Pro",
              price: "Rp 99.000/bulan",
              features: ["Unlimited Invoice", "5 Pengguna", "Ekspor PDF", "Laporan Real-time"]
            }, {
              plan: "Enterprise",
              price: "Rp 299.000/bulan",
              features: ["Unlimited Invoice", "Unlimited User", "Integrasi API", "Prioritas Support"]
            }].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-2xl transition-shadow text-center"
              >
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{p.plan}</h4>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">{p.price}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300">✔ {f}</li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
                  Pilih Paket
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="about" className="px-8 py-24 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Apa Kata Pengguna Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[{
              name: "Andi - UMKM Kopi",
              text: "InvoicePro membuat usaha saya lebih profesional. Pembayaran pelanggan jadi lebih cepat!"
            }, {
              name: "Sinta - Freelancer",
              text: "Sangat membantu untuk mengelola invoice klien luar negeri dengan mata uang berbeda."
            }, {
              name: "Budi - Startup Founder",
              text: "Laporan real-time-nya luar biasa. Investor saya senang melihat data yang jelas."
            }].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6">“{t.text}”</p>
                <h5 className="font-bold text-gray-900 dark:text-white">{t.name}</h5>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-8 py-24">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Pertanyaan yang Sering Diajukan
          </h3>
          <div className="max-w-4xl mx-auto space-y-8">
            {[{
              q: "Apakah ada versi gratisnya?",
              a: "Ya, InvoicePro menyediakan paket Gratis dengan batasan 5 invoice per bulan."
            }, {
              q: "Bisakah digunakan untuk tim?",
              a: "Tentu, paket Pro dan Enterprise mendukung multi-user untuk kolaborasi tim."
            }, {
              q: "Apakah data saya aman?",
              a: "Semua data terenkripsi dengan standar keamanan tinggi."
            }, {
              q: "Bisakah membatalkan langganan kapan saja?",
              a: "Ya, Anda bebas membatalkan kapan pun tanpa biaya tambahan."
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow p-6"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="px-6 py-20 text-center bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <h3 className="text-4xl font-bold mb-6">
            Siap Tingkatkan Bisnis Anda?
          </h3>
          <p className="max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ribuan bisnis yang sudah menggunakan InvoicePro untuk
            mempercepat proses pembayaran dan analisis keuangan.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold shadow-md hover:bg-gray-100">
            Mulai Sekarang Gratis
          </button>
        </section>

        {/* Footer */}
        <footer className="px-8 py-10 bg-gray-200 dark:bg-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-300">© 2025 InvoicePro. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
