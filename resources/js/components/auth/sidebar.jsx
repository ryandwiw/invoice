"use client";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: <Home size={22} />, label: "Dashboard", key: "dashboard" },
  { icon: <Users size={22} />, label: "Users", key: "users" },
  { icon: <BarChart3 size={22} />, label: "Analytics", key: "analytics" },
  { icon: <Settings size={22} />, label: "Settings", key: "settings" },
  { icon: <BookOpen size={22} />, label: "Docs", key: "docs" },
  { icon: <HelpCircle size={22} />, label: "Help", key: "help" },
];

export default function Sidebar({ open, currentPage, setCurrentPage, isMobile }) {
  return (
    <motion.div
      initial={false}
      animate={{ x: open ? 0 : isMobile ? -256 : 0, width: open && !isMobile ? 256 : 64 }}
      transition={{ duration: 0.25 }}
      className={`
        flex flex-col h-full shadow-xl bg-base-100/95 backdrop-blur-md relative
        ${isMobile ? "fixed z-50" : "hidden md:flex md:static"}
      `}
    >
      {/* Gradient border */}
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-base-300 via-base-200 to-base-300" />

      {/* Logo */}
      <div className="flex items-center h-[65px] pl-3 pr-4 border-b shadow-md border-base-300 bg-base-100/80">
        <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-lg font-bold text-white rounded-full bg-primary">
          L
        </span>
        {open && <span className="ml-3 text-lg font-bold">Logo</span>}
      </div>

      {/* Menu */}
      <ul className="flex flex-col flex-1 gap-1 mt-3">
        {menuItems.map((item) => {
          const isActive = currentPage === item.key;
          return (
            <li key={item.key}>
              <button
                onClick={() => setCurrentPage(item.key)}
                className={`flex items-center p-3 rounded-lg w-full transition
                  ${isActive ? "bg-primary/20 text-primary" : "hover:bg-base-300"}`}
              >
                <div className="flex items-center justify-center flex-shrink-0 w-10">
                  {item.icon}
                </div>
                {open && (
                  <span className="ml-2 text-sm font-medium transition-opacity duration-200 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Sign out */}
      <div className="p-3 pl-0 mb-3">
        <button
          onClick={() => console.log("Sign out")}
          className="flex items-center w-full p-3 text-red-600 transition rounded-lg hover:bg-red-100"
        >
          <div className="flex items-center justify-center flex-shrink-0 w-10">
            <LogOut size={22} />
          </div>
          {open && (
            <span className="ml-2 text-sm font-medium whitespace-nowrap">Sign Out</span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
