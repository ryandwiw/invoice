"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppearance } from "@/hooks/use-appearance";
import {
    Menu,
    Bell,
    Home,
    Users,
    BarChart3,
    Settings,
    Moon,
    Sun,
    Search,
    BookOpen,
    HelpCircle,
    LogOut,
} from "lucide-react";

// Sidebar Component
const Sidebar = ({ sidebarOpen, currentPage, setCurrentPage }) => {
    const menuItems = [
        { icon: <Home size={22} />, label: "Dashboard", key: "dashboard" },
        { icon: <Users size={22} />, label: "Users", key: "users" },
        { icon: <BarChart3 size={22} />, label: "Analytics", key: "analytics" },
        { icon: <Settings size={22} />, label: "Settings", key: "settings" },
        { icon: <BookOpen size={22} />, label: "Docs", key: "docs" },
        { icon: <HelpCircle size={22} />, label: "Help", key: "help" },
    ];

    return (
        <motion.div
            animate={{ width: sidebarOpen ? 256 : 64 }}
            transition={{ duration: 0.3 }}
            className="fixed md:static z-50 h-full bg-base-100/95 backdrop-blur-md shadow-xl border-r border-base-300 flex flex-col"
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-3 border-b border-base-300 overflow-hidden">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    L
                </span>
                {sidebarOpen && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-3 font-bold text-lg whitespace-nowrap"
                    >
                        Logo
                    </motion.span>
                )}
            </div>

            {/* Menu */}
            <ul className="flex-1 flex flex-col gap-1 mt-3">
                {menuItems.map((item) => {
                    const isActive = currentPage === item.key;
                    return (
                        <li key={item.key}>
                            <button
                                onClick={() => setCurrentPage(item.key)}
                                className={`flex items-center p-3 rounded-lg w-full transition
                                    ${isActive ? "bg-primary/20 text-primary" : "hover:bg-base-300"}`}
                            >
                                {/* ICON selalu ada */}
                                <div className="flex-shrink-0 flex items-center justify-center w-10">
                                    {item.icon}
                                </div>

                                {/* LABEL hanya kalau sidebarOpen */}
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="ml-2 text-sm font-medium whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Sign out */}
            <div className="p-3 mb-3">
                <button
                    onClick={() => console.log("Sign out")}
                    className="flex items-center p-3 rounded-lg w-full hover:bg-red-100 text-red-600 transition"
                >
                    <div className="flex-shrink-0 flex items-center justify-center w-10">
                        <LogOut size={22} />
                    </div>
                    {sidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-2 text-sm font-medium whitespace-nowrap"
                        >
                            Sign Out
                        </motion.span>
                    )}
                </button>
            </div>
        </motion.div>
    );
};


// Dashboard Layout
export default function DashboardLayout({ children }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState("dashboard");
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {/* Overlay for mobile */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div
                    className={`fixed top-0 right-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-300 px-4 transition-all duration-300 shadow-md
          ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-4rem)]"}`}
                >
                    <div className="flex items-center justify-between h-16">
                        {/* Left */}
                        <div className="flex items-center gap-2 flex-1">
                            {/* Collapse button */}
                            <button
                                className="btn btn-ghost btn-circle"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Menu size={22} />
                            </button>

                            {/* Search */}
                            <div className="hidden sm:flex items-center border border-base-300 rounded-xl px-3 w-full max-w-sm bg-base-100 shadow-sm">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-ghost flex-1 ml-2 p-1 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setNotifOpen(!notifOpen);
                                        setMenuOpen(false);
                                        setProfileOpen(false);
                                    }}
                                    className="btn btn-ghost btn-circle"
                                >
                                    <div className="indicator">
                                        <Bell size={22} />
                                        <span className="indicator-item badge badge-error badge-sm animate-pulse">
                                            5
                                        </span>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {notifOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="fixed right-4 mt-2 shadow-2xl rounded-2xl w-80 max-h-[70vh] overflow-y-auto z-50 border border-base-200 bg-base-100/95 backdrop-blur-lg"
                                        >
                                            <div className="bg-base-200 text-center text-base font-semibold p-3 rounded-t-2xl border-b border-base-300">
                                                Notifications
                                            </div>
                                            <ul className="flex flex-col divide-y divide-base-200">
                                                <li className="flex justify-between items-center text-sm p-3 hover:bg-base-300 transition">
                                                    <span>New user registered</span>
                                                    <span className="text-xs text-base-content/70">2 min ago</span>
                                                </li>
                                                <li className="flex justify-between items-center text-sm p-3 hover:bg-base-300 transition">
                                                    <span>Server restarted</span>
                                                    <span className="text-xs text-base-content/70">10 min ago</span>
                                                </li>
                                                <li className="flex justify-between items-center text-sm p-3 hover:bg-base-300 transition">
                                                    <span>Update available</span>
                                                    <span className="text-xs text-base-content/70">1 hour ago</span>
                                                </li>
                                                <li className="flex justify-center items-center text-sm p-3 cursor-pointer hover:bg-primary/20 text-primary font-medium rounded-b-2xl">
                                                    View All
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Quick Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setMenuOpen(!menuOpen);
                                        setNotifOpen(false);
                                        setProfileOpen(false);
                                    }}
                                    className="btn btn-ghost btn-circle"
                                >
                                    <Menu size={22} />
                                </button>

                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25 }}
                                            className="fixed right-4 mt-2 shadow-2xl rounded-2xl w-72 z-50 border border-base-200 bg-base-100/95 backdrop-blur-lg"
                                        >
                                            <div className="bg-base-200 text-center text-base font-semibold p-3 rounded-t-2xl border-b border-base-300">
                                                Quick Actions
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 p-4 rounded-b-2xl">
                                                <a className="flex flex-col items-center gap-1 p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer">
                                                    <Home size={24} />
                                                    <span className="text-xs">Dashboard</span>
                                                </a>
                                                <a className="flex flex-col items-center gap-1 p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer">
                                                    <Users size={24} />
                                                    <span className="text-xs">Users</span>
                                                </a>
                                                <a className="flex flex-col items-center gap-1 p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer">
                                                    <BarChart3 size={24} />
                                                    <span className="text-xs">Reports</span>
                                                </a>
                                                <a
                                                    className="flex flex-col items-center gap-1 p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer"
                                                    onClick={() => updateAppearance(appearance === "light" ? "dark" : "light")}
                                                >
                                                    {appearance === "light" ? <Sun size={24} /> : <Moon size={24} />}
                                                    <span className="text-xs">Toggle Theme</span>
                                                </a>
                                                <a className="flex flex-col items-center gap-1 p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer">
                                                    <Settings size={24} />
                                                    <span className="text-xs">Settings</span>
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setProfileOpen(!profileOpen);
                                        setNotifOpen(false);
                                        setMenuOpen(false);
                                    }}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt="User Avatar" src="https://i.pravatar.cc/100?img=3" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="fixed right-4 mt-2 shadow-2xl rounded-2xl w-60 z-50 border border-base-200 bg-base-100/95 backdrop-blur-lg"
                                        >
                                            <div className="bg-base-200 text-center font-semibold p-3 rounded-t-2xl border-b border-base-300">
                                                My Account
                                            </div>
                                            <ul className="flex flex-col">
                                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer transition text-sm">
                                                    <Home size={16} /> My Profile
                                                </li>
                                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer transition text-sm">
                                                    <Settings size={16} /> Settings
                                                </li>
                                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-error cursor-pointer transition text-sm">
                                                    <Menu size={16} /> Logout
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overlay for dropdowns */}
                {(notifOpen || menuOpen || profileOpen) && (
                    <div
                        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
                        onClick={() => {
                            setNotifOpen(false);
                            setMenuOpen(false);
                            setProfileOpen(false);
                        }}
                    />
                )}

                <main
                    className={`flex-1 overflow-y-auto transition-all duration-300 mt-16 p-6
    ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`} // <- kalau close, sisakan 64px
                >
                    {children}
                </main>

            </div>
        </div>
    );
}
