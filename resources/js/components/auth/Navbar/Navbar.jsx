"use client";
import React, { useRef, useEffect } from "react";
import { Menu, Bell, Grid } from "lucide-react";
import DropdownNotification from "./DropdownNotification";
import DropdownQuickMenu from "./DropdownQuickMenu";
import DropdownProfile from "./DropdownProfile";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  notifOpen,
  setNotifOpen,
  menuOpen,
  setMenuOpen,
  profileOpen,
  setProfileOpen,
  appearance,
  updateAppearance,
}) {
  // refs untuk masing-masing dropdown
  const notifRef = useRef(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // handle klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifOpen && notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen, menuOpen, profileOpen, setNotifOpen, setMenuOpen, setProfileOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-40 border-b px-4 shadow-md md:shadow-none transition-colors duration-300 border-base-300 bg-base-100 w-full
        ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-4rem)]"}`}
    >
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center flex-1 gap-2">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() =>
              window.innerWidth < 768
                ? setMobileSidebarOpen((prev) => !prev)
                : setSidebarOpen(!sidebarOpen)
            }
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setNotifOpen((prev) => !prev);
                setMenuOpen(false);
                setProfileOpen(false);
              }}
              className="btn btn-ghost btn-circle"
            >
              <Bell size={22} />
            </button>
            <DropdownNotification
              isOpen={notifOpen}
              onClose={() => setNotifOpen(false)}
            />
          </div>

          {/* Quick Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setNotifOpen(false);
                setProfileOpen(false);
              }}
              className="btn btn-ghost btn-circle"
            >
              <Grid size={22} />
            </button>
            <DropdownQuickMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              appearance={appearance}
              toggleAppearance={() =>
                updateAppearance(appearance === "light" ? "dark" : "light")
              }
            />
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotifOpen(false);
                setMenuOpen(false);
              }}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="User Avatar" src="https://i.pravatar.cc/100?img=3" />
              </div>
            </button>
            <DropdownProfile
              isOpen={profileOpen}
              onClose={() => setProfileOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
