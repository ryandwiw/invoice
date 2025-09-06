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
          <div className="flex items-center h-[65px] bg-base-100 shadow-md px-3 border-b border-base-300/70">
            <div className="flex items-center gap-3">
              <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">L</span>
              <span className="text-sm font-bold whitespace-nowrap">Mata Timur Nusantara</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 ml-auto transition-colors rounded-full bg-base-200/70 hover:bg-base-300"
              aria-label="Close sidebar"
            >
              X
            </button>
          </div>

          {/* Menu */}
          <ul className="flex flex-col flex-1 gap-1 mt-3">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.url}
                  onClick={() => {
                    onNavigate(item.key); // ✅ update currentPage
                    onClose();
                  }}
                  className={`flex items-center w-[calc(100%-0.5rem)] mx-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    currentPage === item.key
                      ? "bg-base-100 text-info"
                      : "hover:bg-base-100 text-base-100 hover:text-info"
                  }`}
                >
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
