"use client";
import React, { useState } from "react";
import { useAppearance } from "@/hooks/use-appearance";
import { Menu,Bell,Home,Users,BarChart3,Settings,ChevronLeft,ChevronRight,Moon, Sun,} from "lucide-react";
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
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div
                    className={`fixed top-0 right-0 z-40 bg-base-100 border-b border-base-300 px-4 transition-all duration-300
          ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-5rem)]"}`}
                >
                    <div className="flex items-center justify-between h-16">
                        {/* Left (Title + Toggle Mobile) */}
                        <div className="flex items-center gap-2">
                            <button
                                className="btn btn-ghost btn-circle md:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Menu size={22} />
                            </button>
                            <h2 className="text-lg font-bold hidden md:block">Dashboard</h2>
                        </div>

                        {/* Right (Notif, Menu, Profile) */}
                        <div className="flex items-center gap-2">

                            <div className="flex items-center gap-2">

                                {/* Notification, Menu, Profile (tetap seperti sebelumnya) */}

                                {/* Theme Toggle */}
                                <button
                                    onClick={() => updateAppearance(appearance === "light" ? "dark" : "light")}
                                    className="btn btn-ghost btn-circle p-2"
                                >
                                    {appearance === "light" ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                            </div>

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
                                        <span className="indicator-item badge badge-error badge-sm animate-pulse">5</span>
                                    </div>
                                </button>

                                {notifOpen && (
                                    <div className="fixed right-4 mt-1 shadow-xl rounded-2xl w-80 max-h-[70vh] overflow-y-auto z-50 border border-base-200 animate-slide-down">

                                        {/* Header */}
                                        <div className="bg-base-200 text-center text-base font-semibold p-2 rounded-t-2xl border-b border-base-300">
                                            Notifications
                                        </div>

                                        {/* List Compact */}
                                        <ul className="flex flex-col divide-y divide-base-200 bg-base-100">
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>New user registered</span>
                                                <span className="text-xs text-base-content/70">2 min ago</span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>Server restarted</span>
                                                <span className="text-xs text-base-content/70">10 min ago</span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm p-2">
                                                <span>Update available</span>
                                                <span className="text-xs text-base-content/70">1 hour ago</span>
                                            </li>

                                            {/* Footer / View All */}
                                            <li className="flex justify-center items-center text-sm p-2 cursor-pointer hover:bg-base-300 bg-base-200 rounded-b-2xl">
                                                <span className="font-medium text-base-content">View All</span>
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
                                    className="btn btn-ghost btn-circle "
                                    data-tip="Quick Actions"
                                >
                                    <Menu size={22} />
                                </button>
                                {menuOpen && (
                                    <div className="fixed right-4 mt-2 shadow-lg bg-base-100 rounded-xl w-64 z-50 p-4 border border-base-300 animate-slide-down">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <a className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                <Home size={24} />
                                                <span className="text-xs">Dashboard</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                <Users size={24} />
                                                <span className="text-xs">Users</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                <BarChart3 size={24} />
                                                <span className="text-xs">Reports</span>
                                            </a>
                                            <a className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary hover:text-white transition">
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
                                    data-tip="Profile"
                                >
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt="User Avatar" src="https://i.pravatar.cc/100?img=3" />
                                    </div>
                                </button>

                                {profileOpen && (
                                    <div className="fixed right-4 mt-2 shadow-lg bg-base-100 rounded-xl w-52 z-50 border border-base-300 animate-slide-down">
                                        <ul className="p-2 flex flex-col gap-1">
                                            <li>
                                                <a href="/profile" className="block p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                    My Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/settings" className="block p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/logout" className="block p-2 rounded-lg hover:bg-primary hover:text-white transition">
                                                    Logout
                                                </a>
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
