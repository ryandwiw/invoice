import React from "react";
import { Link } from "@inertiajs/react";

export default function Sidebar({
    sidebarOpen,
    currentPage,
    setCurrentPage,
    menuItems,
}) {
    return (
        <aside aria-label="Sidebar" className="pointer-events-auto">
            <div
                className={`fixed left-0 top-0 z-30 hidden h-screen flex-col md:flex
          bg-info shadow-xl transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-16"}`}
            >
                {/* Logo */}
                <div className="flex items-center h-[65px] bg-base-100 shadow-md px-3 border-b border-base-300/70 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">
                            L
                        </span>
                        <span
                            className={`whitespace-nowrap text-sm font-bold transition-all duration-300
                ${sidebarOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"}`}
                        >
                            Mata Timur Nusantara
                        </span>
                    </div>
                </div>

                {/* Menu */}
                <ul className="flex flex-col flex-1 gap-1 mt-3">
                    {menuItems.map((item) => (
                        <li key={item.key}>
                            <Link
                                href={item.url}
                                onClick={() => setCurrentPage(item.key)} // ✅ update state
                                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                                    currentPage === item.key
                                        ? "bg-base-100 text-info"
                                        : "hover:bg-base-100 text-base-100 hover:text-info"
                                }`}
                            >
                                <div className="grid w-10 place-items-center">{item.icon}</div>
                                <span
                                    className={`text-sm font-medium transition-all duration-300 ${
                                        sidebarOpen
                                            ? "opacity-100"
                                            : "w-0 overflow-hidden opacity-0"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
