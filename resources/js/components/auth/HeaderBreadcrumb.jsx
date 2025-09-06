"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";

export default function HeaderBreadcrumb({ current, menuItems = [] }) {
    const currentItem = menuItems.find((item) => item.key === current);

    return (
        <div className="mb-4 md:mb-6">
            <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 text-sm text-base-content/70"
            >
                <span className="inline-flex items-center gap-1">
                    <Home size={16} /> Home
                </span>
                <ChevronRight size={16} className="opacity-60" />
                <span className="capitalize">
                    {currentItem?.label ?? current}
                </span>
            </motion.div>
        </div>
    );
}

