"use client";
import React from "react";
import { Home, Users, BarChart3, Settings, Sun, Moon } from "lucide-react";
import Dropdown from "./Dropdown";

export default function DropdownQuickMenu({ isOpen, onClose, appearance, toggleAppearance }) {
  return (
    <Dropdown isOpen={isOpen} onClose={onClose} width="w-80">
      <div className="p-3 text-base font-semibold text-center border-b rounded-t-2xl border-base-300 bg-base-200">
        Quick Actions
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 rounded-b-2xl">
        <a className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-primary/10">
          <Home size={24} />
          <span className="text-xs">Dashboard</span>
        </a>
        <a className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-primary/10">
          <Users size={24} />
          <span className="text-xs">Users</span>
        </a>
        <a className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-primary/10">
          <BarChart3 size={24} />
          <span className="text-xs">Reports</span>
        </a>
        <a
          className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-primary/10"
          onClick={toggleAppearance}
        >
          {appearance === "light" ? <Sun size={24} /> : <Moon size={24} />}
          <span className="text-xs">Toggle Theme</span>
        </a>
        <a className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-primary/10">
          <Settings size={24} />
          <span className="text-xs">Settings</span>
        </a>
      </div>
    </Dropdown>
  );
}
