"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedDropdown({ isOpen, onClose, width = "w-80", children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`fixed right-2 top-16 z-50 ${width} max-h-[70vh] overflow-y-auto rounded-2xl border border-base-200 bg-base-100 shadow-xl`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
