import React from "react";
import { motion as m } from "framer-motion";
import Navbar from "../../../components/landingpage/Navbar";
import Footer from "../../../components/landingpage/Footer";

const SyaratKetentuan = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-base-100 text-base-content">
      {/* Animated gradient background using framer-motion */}
      <m.div
        animate={{
          x: ["0%", "-25%", "0%"],
          y: ["0%", "10%", "0%"],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 w-[200%] h-[200%] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
      ></m.div>

      <Navbar />

      <section className="container max-w-3xl px-6 py-32 mx-auto">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative p-10 shadow-2xl rounded-3xl bg-base-200/90 backdrop-blur-sm"
        >
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-bold">Syarat & Ketentuan</h1>
            <p className="text-lg">
              Pahami syarat layanan kami sebelum menggunakan sistem Invoice modern ini.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">1. Penggunaan Layanan</h2>
            <p>
              Layanan hanya boleh digunakan untuk tujuan sah sesuai hukum. Dilarang
              menggunakan sistem untuk aktivitas ilegal, spam, penipuan, atau
              merugikan pihak lain.
            </p>

            <h2 className="text-xl font-semibold">2. Akun & Keamanan</h2>
            <p>
              Anda bertanggung jawab menjaga kerahasiaan akun dan kata sandi. Kami
              tidak bertanggung jawab atas kerugian akibat penyalahgunaan akun
              oleh pihak lain.
            </p>

            <h2 className="text-xl font-semibold">3. Pembaruan & Perubahan</h2>
            <p>
              Kami berhak mengubah syarat & ketentuan sewaktu-waktu dengan
              pemberitahuan melalui website atau email resmi.
            </p>

            <h2 className="text-xl font-semibold">4. Privasi Data</h2>
            <p>
              Data pengguna akan dijaga kerahasiaannya, hanya digunakan untuk
              keperluan operasional, dan dilindungi sesuai kebijakan privasi.
            </p>
          </div>
        </m.div>
      </section>

      <Footer />
    </div>
  );
};

export default SyaratKetentuan;
