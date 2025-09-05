"use client";
import React from "react";
import { Home, Settings, Menu } from "lucide-react";
import Dropdown from "./Dropdown";

export default function DropdownProfile({ isOpen, onClose }) {
  return (
    <Dropdown isOpen={isOpen} onClose={onClose} width="w-60">
      <div className="p-3 font-semibold text-center border-b bg-base-200 rounded-t-2xl border-base-300">
        My Account
      </div>
      <ul className="flex flex-col">
        <li className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-base-300">
          <Home size={16} /> My Profile
        </li>
        <li className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-base-300">
          <Settings size={16} /> Settings
        </li>
        <li className="flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-red-100">
          <Menu size={16} /> Logout
        </li>
      </ul>
    </Dropdown>
  );
}
