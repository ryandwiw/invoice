import { LazyMotion, domAnimation, m } from "framer-motion";
import Navbar from "../../components/landingpage/Navbar";
import Footer from "../../components/landingpage/Footer";

const steps = [
    {
        step: "1",
        title: "Buat Invoice",
        desc: "Hanya beberapa klik untuk membuat invoice dengan template profesional.",
    },
    {
        step: "2",
        title: "Kirim & Lacak",
        desc: "Kirim langsung ke email klien dan pantau status secara real-time.",
    },
    {
        step: "3",
        title: "Terima Pembayaran",
        desc: "Klien membayar dengan aman secara online, Anda dapat notifikasi instan.",
    },
    {
        step: "4",
        title: "Atur Data",
        desc: "Simpan dan kelola semua invoice dalam dashboard yang rapi.",
    },
    {
        step: "5",
        title: "Analisis Bisnis",
        desc: "Lihat laporan keuangan dan tren pembayaran untuk pengambilan keputusan lebih baik.",
    },
];

const caraKerja = () => {
    return (
        <LazyMotion features={domAnimation}>
            <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
                <Navbar />

                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center px-6 py-32 overflow-hidden text-center md:py-40 md:px-20 bg-base-100">
                    {/* Glow background */}
                    <m.div
                        className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/40 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <m.div
                        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"
                        animate={{ opacity: [0.2, 0.45, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Hero Content */}
                    <div className="relative z-10 flex flex-col items-center max-w-4xl space-y-6">
                        <m.h1
                            className="text-4xl font-bold leading-tight md:text-6xl"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Cara Kerja{" "}
                            <m.span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto]"
                                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            >
                                Invoice Digital
                            </m.span>
                        </m.h1>

                        <m.p
                            className="max-w-2xl mx-auto text-lg opacity-80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            Pahami bagaimana sistem invoice digital membantu Anda mengelola keuangan
                            dengan lebih mudah, cepat, dan aman. Mulai dari pembuatan, pengiriman,
                            hingga pembayaran – semua serba otomatis.
                        </m.p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 rounded-full shadow-lg btn btn-primary"
                            >
                                Mulai Sekarang
                            </m.button>
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 rounded-full btn btn-outline"
                            >
                                Lihat Demo
                            </m.button>
                        </div>

                        {/* Hero Illustration */}
                        <m.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative mt-12"
                        >
                                <div className="overflow-hidden border rounded-2xl shadow-2xl w-[300px] md:w-[400px] h-[250px] flex items-center justify-center bg-base-200">
                                    <span className="opacity-60">[Preview Invoice]</span>
                                </div>
                        </m.div>
                    </div>
                </section>


                {/* Steps Section */}
                <section className="relative px-6 py-24 overflow-hidden md:px-20 bg-base-100">
                    {/* Gradient dekorasi */}
                    <m.div
                        className="absolute rounded-full -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl"
                        animate={{ opacity: [0.25, 0.5, 0.25] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <m.div
                        className="absolute bottom-0 right-0 rounded-full w-80 h-80 bg-gradient-to-tl from-secondary/30 to-primary/30 blur-3xl"
                        animate={{ opacity: [0.2, 0.45, 0.2] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    <div className="container relative z-10 max-w-6xl mx-auto space-y-16 text-center">
                        <m.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold md:text-4xl"
                        >
                            Langkah-langkah Mudah
                        </m.h2>

                        <div className="relative flex flex-col justify-between md:flex-row">
                            {/* Garis penghubung untuk desktop */}
                            <div className="absolute left-0 hidden w-full border-t-2 md:block top-8 border-primary/60" />

                            {steps.map((w, i) => (
                                <m.div
                                    key={i}
                                    className="relative flex flex-col items-center w-full mb-12 text-center md:w-1/5 md:mb-0"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Lingkaran Step */}
                                    <div className="z-10 flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full shadow-lg bg-primary">
                                        {w.step}
                                    </div>

                                    {/* Teks */}
                                    <div className="px-4 mt-6">
                                        <h3 className="text-lg font-semibold">{w.title}</h3>
                                        <p className="mt-1 text-sm opacity-70">{w.desc}</p>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </LazyMotion>
    );
};

export default caraKerja;
