"use client";
import React from "react";
import { Home, Users, BarChart3, Settings, BookOpen, HelpCircle, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ sidebarOpen, currentPage, setCurrentPage, isMobile }) {
  const menuItems = [
    { icon: <Home size={22} />, label: "Dashboard", key: "dashboard" },
    { icon: <Users size={22} />, label: "Users", key: "users" },
    { icon: <BarChart3 size={22} />, label: "Analytics", key: "analytics" },
    { icon: <Settings size={22} />, label: "Settings", key: "settings" },
    { icon: <BookOpen size={22} />, label: "Docs", key: "docs" },
    { icon: <HelpCircle size={22} />, label: "Help", key: "help" },
  ];

  return (
    <div
      className={`flex flex-col h-full shadow-xl transition-colors duration-300 bg-base-100
        ${isMobile ? "fixed z-50" : "hidden md:flex md:static"}`}
      style={{ width: sidebarOpen ? 256 : 64 }}
    >
      {/* Logo */}
      <div className="flex items-center h-[65px] pl-3 shadow-md border-b transition-colors duration-300 border-base-300 bg-base-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 font-bold text-white transition-colors duration-300 rounded-full bg-primary">
            L
          </span>
          <span className={`text-lg font-bold whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
            Logo
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

      {/* Sign Out */}
      <div className="p-3 mb-3">
        <button
          onClick={() => console.log("Sign out")}
          className="flex items-center w-full text-red-600 transition-colors duration-300 rounded-lg hover:bg-red-100"
        >
          <div className="flex items-center justify-center w-10">
            <LogOut size={22} />
          </div>
          <span
            className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
          >
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}
