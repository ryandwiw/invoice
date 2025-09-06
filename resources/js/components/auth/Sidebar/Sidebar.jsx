import React from "react";
import { Link } from "@inertiajs/react";

export default function Sidebar({ sidebarOpen, currentPage, setCurrentPage, menuItems }) {
  return (
    <aside aria-label="Sidebar" className="pointer-events-auto">
      <div
        className={`fixed left-0 top-0 z-30 hidden h-screen flex-col md:flex
          bg-info shadow-xl transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-3 transition-colors duration-300 border-b shadow-md bg-base-100 border-base-300/70">
          <div className="flex items-center gap-3">
            <span className="grid w-10 h-10 font-bold text-white rounded-full place-items-center bg-primary">
              L
            </span>
            <span className={`whitespace-nowrap text-sm font-bold transition-all duration-300
              ${sidebarOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"}`}
            >
              Mata Timur Nusantara
            </span>
          </div>
        </div>

        {/* Menu */}
        <ul className="flex flex-col flex-1 gap-1 px-2 mt-3">
          {menuItems.map((item) => (
            <li key={item.key} className="relative">
              <Link
                href={item.url}
                onClick={() => setCurrentPage(item.key)}
                className={`group flex items-center px-2 py-3 rounded-lg transition-colors duration-200 relative
                  ${currentPage === item.key
                    ? "bg-base-100 text-info shadow-sm"
                    : "text-base-100 hover:bg-base-100/20 hover:text-white"
                  }`}
              >
                {/* Indikator bar kiri */}
                {currentPage === item.key && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-md bg-warning"></span>
                )}

                <div className="grid w-10 place-items-center">{item.icon}</div>
                <span className={`text-sm font-medium transition-all duration-300
                  ${sidebarOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"}`}
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
