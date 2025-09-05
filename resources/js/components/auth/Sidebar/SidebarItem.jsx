"use client";
import React from "react";

export default function SidebarItem({ icon, label, isActive, sidebarOpen, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center p-3 rounded-lg w-full transition-colors duration-300
        ${isActive ? "bg-primary/20 text-primary" : "hover:bg-base-300"}`}
      >
        <div className="flex items-center justify-center w-10">{icon}</div>
        <span
          className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
        >
          {label}
        </span>
      </button>
    </li>
  );
}
