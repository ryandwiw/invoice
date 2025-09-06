"use client";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Settings, User, Lock, Palette } from "lucide-react";

const sidebarNavItems = [
  {
    title: "Profile",
    url: "/settings/profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    title: "Password",
    url: "/settings/password",
    icon: <Lock className="w-4 h-4" />,
  },
  {
    title: "Appearance",
    url: "/settings/appearance",
    icon: <Palette className="w-4 h-4" />,
  },
];

export default function SettingsLayout({ children }) {
  if (typeof window === "undefined") return null;

  const currentPath = window.location.pathname;

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        {/* Sidebar */}
        <aside className="w-full max-w-xl lg:w-56">
          <div className="border shadow-xl card bg-base-100 border-base-200">
            <div className="p-4 space-y-4 card-body">
              {/* Header Card */}
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                {sidebarNavItems.map((item) => {
                  const active = currentPath === item.url;
                  return (
                    <motion.div
                      key={item.url}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        href={item.url}
                        prefetch
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors duration-300
                          ${
                            active
                              ? "bg-primary text-primary-content shadow-md"
                              : "hover:bg-base-200"
                          }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Content with Card */}
        <motion.div
          className="flex-1 md:max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="border shadow-xl card bg-base-100 border-base-200">
            <div className="space-y-6 card-body">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
