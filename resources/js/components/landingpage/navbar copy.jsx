import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar2({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lang, setLang] = useState("id"); // id | en | zh
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseExpanded = scrolled;
  const isExpanded = mobileMenu || baseExpanded;

  // Menu produk
  const produkItems = [
    {
      icon: "📄",
      title: "Invoice Penjualan",
      desc: "Buat invoice tanpa batas & pasang e-Meterai hanya dengan 1 klik!"
    },
    {
      icon: "💳",
      title: "PaperPay In",
      desc: "Berikan berbagai cara bayar invoice ke customer & semuanya terekonsiliasi otomatis!"
    },
    {
      icon: "✉️",
      title: "Kirim Invoice",
      desc: "Kirim invoice gratis & tanpa batas via Whatsapp, Email atau SMS."
    },
    {
      icon: "⏰",
      title: "Pengingat Pembayaran",
      desc: "Atur pengingat agar customer bayar tepat waktu."
    },
    {
      icon: "🧾",
      title: "e-Meterai",
      desc: "Beli & bubuhkan e-Meterai pada dokumen invoice dengan mudah!"
    },
    {
      divider: true,
      label: "Solusi Transaksi & Pembayaran"
    },
    {
      icon: "💳",
      title: "PAPERCARD",
      desc: "Solusi pembayaran untuk transaksi bisnis dengan berbagai keuntungan eksklusif"
    },
    {
      icon: "🌍",
      title: "PaperXB (New)",
      desc: "Pertama di Indonesia, solusi transaksi lintas negara pakai kartu kredit"
    },
    {
      icon: "🏦",
      title: "PaperPay Out",
      desc: "Bayar Supplier dengan metode fleksibel termasuk Kartu Kredit"
    },
    {
      icon: "💳",
      title: "Paper Pioneer Card",
      desc: "Kartu kredit virtual limit hingga Rp100jt, approval 5 hari kerja"
    },
    {
      icon: "💳",
      title: "Paper Horizon Card",
      desc: "Kartu kredit untuk kelola pengeluaran dengan biaya 1,3% di Paper.id"
    }
  ];

  // bahasa
  const langs = {
    id: "Indonesia 🇮🇩",
    en: "English 🇺🇸",
    zh: "中文 🇨🇳"
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        borderRadius: isExpanded ? 0 : 40,
        marginTop: baseExpanded ? 0 : 16,
        width: isExpanded ? "100%" : "85%",
        scale: isExpanded ? 1 : 0.98,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-1/2 -translate-x-1/2 top-0 z-50
        flex flex-col bg-white dark:bg-gray-900 backdrop-blur-lg shadow-lg"
    >
      {/* Bar atas */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            IP
          </span>
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            InvoicePro
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {/* Produk dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Produk <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 grid gap-3 z-50"
                >
                  {produkItems.map((item, idx) =>
                    item.divider ? (
                      <div key={idx} className="text-sm text-gray-500 dark:text-gray-400 border-t pt-2">
                        {item.label}
                      </div>
                    ) : (
                      <div key={idx} className="flex gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#how" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Cara Kerja
          </a>
          <a href="#pricing" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Harga
          </a>
          <a href="#company" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Perusahaan
          </a>

          {/* Language */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg px-2 py-1 text-sm"
          >
            {Object.entries(langs).map(([key, val]) => (
              <option key={key} value={key}>{val}</option>
            ))}
          </select>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:hidden px-6 pb-6 space-y-4 border-t border-gray-300 dark:border-gray-700"
          >
            {/* Produk (mobile collapsible) */}
            <div>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-1 w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                Produk <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 grid gap-3"
                  >
                    {produkItems.map((item, idx) =>
                      item.divider ? (
                        <div key={idx} className="text-sm text-gray-500 dark:text-gray-400 border-t pt-2">
                          {item.label}
                        </div>
                      ) : (
                        <div key={idx} className="flex gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#how" onClick={() => setMobileMenu(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Cara Kerja
            </a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Harga
            </a>
            <a href="#company" onClick={() => setMobileMenu(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Perusahaan
            </a>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg px-2 py-1 text-sm"
            >
              {Object.entries(langs).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenu(false);
              }}
              className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
