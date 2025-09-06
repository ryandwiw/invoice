"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Users, BarChart3, Settings, BookOpen, HelpCircle, LogOut, X } from "lucide-react";

export default function MobileSidebar({ open, onClose, currentPage, onNavigate }) {
    const menuItems = [
        { icon: <Home size={22} />, label: "Dashboard", key: "dashboard" },
        { icon: <Users size={22} />, label: "Users", key: "users" },
        { icon: <BarChart3 size={22} />, label: "Analytics", key: "analytics" },
        { icon: <Settings size={22} />, label: "Settings", key: "settings" },
        { icon: <BookOpen size={22} />, label: "Docs", key: "docs" },
        { icon: <HelpCircle size={22} />, label: "Help", key: "help" },
        { icon: <LogOut size={22} />, label: "Logout", key: "logout" },
    ];

    return (
        <AnimatePresence>
            {open && (
                <motion.aside
                    initial={{ x: -280 }}
                    animate={{ x: 0 }}
                    exit={{ x: -280 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="fixed top-0 left-0 z-50 w-64 h-full border-r border-base-300 bg-base-100 md:hidden"
                >
                    <div className="flex items-center h-16 px-3 border-b border-base-300/70">
                        <div className="flex items-center gap-3">
                            <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">
                                L
                            </span>
                            <span className="text-sm font-bold">Mata Timur Nusantara</span>
                        </div>
                    </div>
                    <ul className="flex flex-col flex-1 gap-2 mt-3">
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    onClick={() => onNavigate(item.key)}
                                    className={`flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-primary/10 ${
                                        currentPage === item.key ? "bg-primary/15 text-primary" : ""
                                    }`}
                                    style={{ width: "calc(100% - 12px)", marginLeft: "6px" }}
                                >
                                    <div className="grid w-10 place-items-center">{item.icon}</div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={onClose}
                        className="absolute p-2 transition-colors rounded-full top-4 right-4 bg-base-200/70 hover:bg-base-300"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
