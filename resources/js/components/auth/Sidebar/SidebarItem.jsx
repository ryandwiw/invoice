"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SidebarItem({ icon, label, isActive, sidebarOpen, onClick }) {
    return (
        <li>
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className={`group relative mx-1.5 my-0.5 flex items-center rounded-xl p-2 text-base-100 transition-colors duration-200 hover:bg-base-100 hover:text-info ${
                    isActive ? "bg-base-100 text-info" : ""
                }`}
                style={{ width: "calc(100% - 12px)", marginLeft: "6px" }}
            >
                {/* Active indicator */}
                <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 rounded-r-full bg-warning transition-all ${
                        isActive ? "w-1 opacity-100 " : "w-0 opacity-0 "
                    }`}
                />
                <div className="grid w-10 place-items-center">{icon}</div>
                <span
                    className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        sidebarOpen ? "ml-1.5 opacity-100" : "w-0 overflow-hidden opacity-0"
                    }`}
                >
                    {label}
                </span>
                {/* Tooltip collapsed */}
                {!sidebarOpen && (
                    <span className="absolute z-50 px-2 py-1 text-xs transition-all scale-95 -translate-y-8 border rounded-md shadow-sm opacity-0 pointer-events-none left-14 border-base-300 bg-base-100 group-hover:-translate-y-10 group-hover:opacity-100">
                        {label}
                    </span>
                )}
            </motion.button>
        </li>
    );
}
