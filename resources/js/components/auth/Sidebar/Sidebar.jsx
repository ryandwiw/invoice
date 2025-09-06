"use client";
import React, { useMemo } from "react";
import {
    Home,
    Users,
    BarChart3,
    Settings,
    BookOpen,
    HelpCircle,
    LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ sidebarOpen, currentPage, setCurrentPage }) {
    const menuItems = useMemo(
        () => [
            { icon: <Home size={22} />, label: "Dashboard", key: "dashboard" },
            { icon: <Users size={22} />, label: "Users", key: "users" },
            { icon: <BarChart3 size={22} />, label: "Analytics", key: "analytics" },
            { icon: <Settings size={22} />, label: "Settings", key: "settings" },
            { icon: <BookOpen size={22} />, label: "Docs", key: "docs" },
            { icon: <HelpCircle size={22} />, label: "Help", key: "help" },
            { icon: <LogOut size={22} />, label: "Logout", key: "logout" },
        ],
        []
    );

    return (
        <aside aria-label="Sidebar" className="pointer-events-auto">
            <div
                className={`fixed left-0 top-0 z-30 hidden h-screen flex-col md:flex bg-info shadow-xl transition-all transition-colors duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-16"}`}
            >
                {/* Logo */}
                <div className="flex items-center h-[65px] bg-base-100 shadow-md px-3 border-b border-base-300/70 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        {/* Tetap bg-primary */}
                        <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">
                            L
                        </span>
                        <span
                            className={`whitespace-nowrap text-sm font-bold transition-all duration-300 ${sidebarOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"
                                }`}
                        >
                            Mata Timur Nusantara
                        </span>
                    </div>
                </div>


                {/* Menu */}
                <ul className="flex flex-col flex-1 gap-1 mt-3">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.key}
                            sidebarOpen={sidebarOpen}
                            onClick={() => setCurrentPage(item.key)}
                        />
                    ))}
                </ul>
            </div>
        </aside>
    );
}
