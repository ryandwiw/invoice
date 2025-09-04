import React, { useState } from "react";

import {Home,Users,BarChart3,Settings,ChevronLeft,ChevronRight, } from "lucide-react";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {


    return (
        <div
            className={`hidden md:flex flex-col border-r border-base-300 bg-base-100 transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-20"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 ">
                {sidebarOpen && <h1 className="font-bold text-xl">Admin</h1>}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="btn btn-ghost btn-xs"
                >
                    {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
            </div>

            {/* Menu */}
            <ul className="menu p-2 flex-1">
                <li>
                    <a className="flex items-center gap-2">
                        <Home size={20} /> {sidebarOpen && "Dashboard"}
                    </a>
                </li>
                <li>
                    <a className="flex items-center gap-2">
                        <Users size={20} /> {sidebarOpen && "Users"}
                    </a>
                </li>
                <li>
                    <a className="flex items-center gap-2">
                        <BarChart3 size={20} /> {sidebarOpen && "Analytics"}
                    </a>
                </li>
                <li>
                    <a className="flex items-center gap-2">
                        <Settings size={20} /> {sidebarOpen && "Settings"}
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
