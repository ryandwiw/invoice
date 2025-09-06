"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MobileSidebar from "../components/auth/Sidebar/MobileSidebar";
import HeaderBreadcrumb from "../components/auth/HeaderBreadcrumb";
import Navbar from "../components/auth/Navbar/Navbar";
import Sidebar from "../components/auth/Sidebar/Sidebar";

// 🔑 pakai hook appearance
import { useAppearance } from "@/hooks/use-appearance";

export default function ModernDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ ambil dari hook
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div className="relative min-h-screen bg-base-200/60">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        appearance={appearance}              // ✅ state dari hook
        updateAppearance={updateAppearance}  // ✅ function dari hook
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        setCurrentPage={(key) => {
          setCurrentPage(key);
          setMobileSidebarOpen(false);
        }}
      />

      {/* Overlay mobile */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={(k) => {
          setCurrentPage(k);
          setMobileSidebarOpen(false);
        }}
      />

      <main
        className={`pt-16 transition-[margin] duration-300 ease-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          <HeaderBreadcrumb current={currentPage} />
          {children}
        </div>
      </main>
    </div>
  );
}
