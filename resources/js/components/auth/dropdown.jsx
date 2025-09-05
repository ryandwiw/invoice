"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({ open, onClose, children, className }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`fixed z-50 mt-2 shadow-xl rounded-xl border border-base-200 bg-base-100/95 backdrop-blur-sm ${className}`}
          >
            {children}
          </motion.div>
          {/* overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
}
