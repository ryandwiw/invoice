"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ title, subtitle, className = "", children }) {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className={`rounded-2xl border border-base-300/60 bg-base-100/70 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] p-4 md:p-5 transition-colors duration-300 ${className}`}
        >
            <div className="mb-3">
                <h3 className="text-base font-semibold leading-tight">{title}</h3>
                {subtitle && (
                    <p className="text-xs text-base-content/60 mt-0.5">{subtitle}</p>
                )}
            </div>
            {children}
        </motion.div>
    );
}
