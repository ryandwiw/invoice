"use client";
import { useState } from "react";
import { Menu, Bell, Search, Sun, Moon, Settings, Users, Home, BarChart3 } from "lucide-react";
import Dropdown from "./Dropdown";
import { useAppearance } from "@/hooks/use-appearance";

export default function Navbar({ sidebarOpen, setSidebarOpen, setMobileSidebarOpen }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div
      className={`fixed top-0 right-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-300 px-4 shadow-md
        ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-4rem)]"} w-full`}
    >
      <div className="flex items-center justify-between h-16">
        {/* Left */}
        <div className="flex items-center flex-1 gap-2">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() =>
              window.innerWidth < 768 ? setMobileSidebarOpen(true) : setSidebarOpen(!sidebarOpen)
            }
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="items-center hidden w-full max-w-sm px-3 border shadow-sm sm:flex border-base-300 rounded-xl bg-base-100">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-1 ml-2 input input-ghost focus:outline-none"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
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
                <span className="indicator-item badge badge-error badge-sm animate-pulse">
                  5
                </span>
              </div>
            </button>
            <Dropdown open={notifOpen} onClose={() => setNotifOpen(false)} className="right-4 w-80">
              <div className="p-3 text-base font-semibold text-center border-b bg-base-200 rounded-t-xl">
                Notifications
              </div>
              <ul className="flex flex-col divide-y divide-base-200">
                <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
                  <span>New user registered</span>
                  <span className="text-xs text-base-content/70">2 min ago</span>
                </li>
                <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
                  <span>Server restarted</span>
                  <span className="text-xs text-base-content/70">10 min ago</span>
                </li>
                <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
                  <span>Update available</span>
                  <span className="text-xs text-base-content/70">1h ago</span>
                </li>
              </ul>
            </Dropdown>
          </div>

          {/* Quick Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setNotifOpen(false);
                setProfileOpen(false);
              }}
              className="btn btn-ghost btn-circle"
            >
              <Menu size={22} />
            </button>
            <Dropdown open={menuOpen} onClose={() => setMenuOpen(false)} className="right-4 w-72">
              <div className="p-3 text-base font-semibold text-center border-b bg-base-200 rounded-t-xl">
                Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <a className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10">
                  <Home size={24} />
                  <span className="text-xs">Dashboard</span>
                </a>
                <a className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10">
                  <Users size={24} />
                  <span className="text-xs">Users</span>
                </a>
                <a className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10">
                  <BarChart3 size={24} />
                  <span className="text-xs">Reports</span>
                </a>
                <a
                  className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10"
                  onClick={() =>
                    updateAppearance(appearance === "light" ? "dark" : "light")
                  }
                >
                  {appearance === "light" ? <Sun size={24} /> : <Moon size={24} />}
                  <span className="text-xs">Toggle Theme</span>
                </a>
                <a className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10">
                  <Settings size={24} />
                  <span className="text-xs">Settings</span>
                </a>
              </div>
            </Dropdown>
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
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="User Avatar" src="https://i.pravatar.cc/100?img=3" />
              </div>
            </button>
            <Dropdown open={profileOpen} onClose={() => setProfileOpen(false)} className="right-4 w-60">
              <div className="p-3 font-semibold text-center border-b bg-base-200 rounded-t-xl">
                My Account
              </div>
              <ul className="flex flex-col">
                <li className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-base-300">
                  <Home size={16} /> My Profile
                </li>
                <li className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-base-300">
                  <Settings size={16} /> Settings
                </li>
                <li className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-100 text-error">
                  <Menu size={16} /> Logout
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
