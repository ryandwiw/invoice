"use client";
import React, { useState } from "react";
import Sidebar from "../components/auth/Sidebar/Sidebar";
import Navbar from "../components/auth/Navbar/Navbar";
import { useAppearance } from "@/hooks/use-appearance";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [notifOpen, setNotifOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex h-screen transition-colors duration-300 bg-base-200">
            {/* Desktop Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={false}
            />

            {/* Mobile Sidebar */}


            {/* Overlay for Mobile Sidebar */}
            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 md:hidden`}
                style={{ transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
            >
                <Sidebar
                    sidebarOpen={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isMobile={true}
                />
            </div>

            {/* Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}



            <div className="flex flex-col flex-1">
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    mobileSidebarOpen={mobileSidebarOpen}
                    setMobileSidebarOpen={setMobileSidebarOpen}
                    notifOpen={notifOpen}
                    setNotifOpen={setNotifOpen}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    profileOpen={profileOpen}
                    setProfileOpen={setProfileOpen}
                    appearance={appearance}
                    updateAppearance={updateAppearance}
                />

                <main className={`flex-1 overflow-y-auto mt-16 p-6 ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
