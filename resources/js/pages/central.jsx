"use client";
import React, { useState } from "react";
import { useAppearance } from "@/hooks/use-appearance";
import {
    Menu,
    Bell,
    Home,
    Users,
    BarChart3,
    Settings,
    Moon,
    Sun, Search
} from "lucide-react";
import Sidebar from "../components/auth/sidebar";

export default function DashboardLayout({ children }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div
                    className={`fixed top-0 right-0 z-40 bg-base-100 border-b border-base-300 px-4 transition-all duration-300
            ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-5rem)]"}`}
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

                            {/* Search input wrapper */}
                            <div className="flex items-center border border-base-300 rounded-md px-2 w-full max-w-sm bg-base-100">
                                {/* Icon */}
                                <Search size={18} className="text-gray-400" />
                                {/* Input */}
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-ghost flex-1 ml-2 p-1 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">

                            {/* Notif */}
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

                                {notifOpen && (
                                    <div className="fixed right-4 mt-1 shadow-xl rounded-2xl w-80 max-h-[70vh] overflow-y-auto z-50 border border-base-200 animate-slide-down">
                                        <div className="bg-base-200 text-center text-base font-semibold p-2 rounded-t-2xl border-b border-base-300">
                                            Notifications
                                        </div>
                                        <ul className="flex flex-col divide-y divide-base-200 bg-base-100">
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>New user registered</span>
                                                <span className="text-xs text-base-content/70">
                                                    2 min ago
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>Server restarted</span>
                                                <span className="text-xs text-base-content/70">
                                                    10 min ago
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>Update available</span>
                                                <span className="text-xs text-base-content/70">
                                                    1 hour ago
                                                </span>
                                            </li>
                                            <li className="flex justify-center items-center text-sm p-2 cursor-pointer hover:bg-base-300 bg-base-200 rounded-b-2xl">
                                                <span className="font-medium text-base-content">
                                                    View All
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Menu Dropdown */}
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
                                {menuOpen && (
                                    <div className="fixed right-4 mt-1 shadow-xl rounded-2xl w-72 z-50 border border-base-200 animate-slide-down">
                                        <div className="bg-base-200 text-center text-base font-semibold p-2 rounded-t-2xl border-b border-base-300">
                                            Quick Actions
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 bg-base-100 p-4 rounded-b-2xl">
                                            <a className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition cursor-pointer">
                                                <Home size={24} />
                                                <span className="text-xs">Dashboard</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition cursor-pointer">
                                                <Users size={24} />
                                                <span className="text-xs">Users</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition cursor-pointer">
                                                <BarChart3 size={24} />
                                                <span className="text-xs">Reports</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition cursor-pointer"
                                                onClick={() => updateAppearance(appearance === "light" ? "dark" : "light")}
                                            >
                                                {appearance === "light" ? <Sun size={24} /> : <Moon size={24} />}
                                                <span className="text-xs">Toggle Theme</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition cursor-pointer">
                                                <Settings size={24} />
                                                <span className="text-xs">Settings</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
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

                                {profileOpen && (
                                    <div className="fixed right-4 mt-1 shadow-xl rounded-2xl w-60 z-50 border border-base-200 animate-slide-down">
                                        <div className="bg-base-200 text-center font-semibold p-2 rounded-t-2xl border-b border-base-300">
                                            My Account
                                        </div>
                                        <ul className="flex flex-col bg-base-100 rounded-b-2xl">
                                            <li className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer transition text-sm">
                                                <Home size={16} /> My Profile
                                            </li>
                                            <li className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer transition text-sm">
                                                <Settings size={16} /> Settings
                                            </li>
                                            <li className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer transition text-sm text-error">
                                                <Menu size={16} /> Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                {(notifOpen || menuOpen || profileOpen) && (
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => {
                            setNotifOpen(false);
                            setMenuOpen(false);
                            setProfileOpen(false);
                        }}
                    />
                )}

                {/* Content */}
                <main
                    className={`flex-1 overflow-y-auto transition-all duration-300 mt-16 p-6
            ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
