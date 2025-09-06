import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link } from "@inertiajs/react";

export default function MobileSidebar({ open, onClose, menuItems, currentPage, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="fixed top-0 left-0 z-50 flex flex-col w-64 h-screen shadow-xl bg-info md:hidden"
        >
          {/* Header */}
          <div className="flex items-center h-16 px-3 border-b shadow-md bg-base-100 border-base-300/70">
            <div className="flex items-center gap-3">
              <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">
                L
              </span>
              <span className="text-sm font-bold whitespace-nowrap">Mata Timur Nusantara</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 ml-auto transition-colors rounded-full bg-base-200/70 hover:bg-base-300"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <ul className="flex flex-col flex-1 gap-1 px-2 mt-3">
            {menuItems.map((item) => (
              <li key={item.key} className="relative">
                <Link
                  href={item.url}
                  onClick={() => {
                    onNavigate(item.key);
                    onClose();
                  }}
                  className={`group flex items-center px-2 py-3 rounded-lg transition-colors duration-200 relative
                    ${currentPage === item.key
                      ? "bg-base-100 text-info shadow-sm"
                      : "text-base-100 hover:bg-base-100/20 hover:text-white"
                    }`}
                >
                  {/* Indikator bar kiri */}
                  {currentPage === item.key && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-md bg-warning"></span>
                  )}

                  <div className="grid w-10 place-items-center">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
