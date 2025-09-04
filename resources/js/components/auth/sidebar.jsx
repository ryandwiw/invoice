import { Home, Users, BarChart3, Settings, BookOpen, HelpCircle, LogOut } from "lucide-react";

const Sidebar = ({ sidebarOpen, currentPage, setCurrentPage }) => {
    const menuItems = [
        { icon: <Home size={24} />, label: "Dashboard", key: "dashboard" },
        { icon: <Users size={24} />, label: "Users", key: "users" },
        { icon: <BarChart3 size={24} />, label: "Analytics", key: "analytics" },
        { icon: <Settings size={24} />, label: "Settings", key: "settings" },
        { icon: <BookOpen size={24} />, label: "Docs", key: "docs" },
        { icon: <HelpCircle size={24} />, label: "Help", key: "help" },
    ];

    return (
        <div
            className={`hidden md:flex flex-col h-full border-r border-base-300 bg-base-100
            transition-all duration-300 ease-in-out overflow-hidden
            ${sidebarOpen ? "w-64" : "w-20"}`}
        >
            {/* Logo Header */}
            <div className="flex items-center h-16 px-4">
                <span
                    className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "translate-x-1"}`}
                >
                    L
                </span>
            </div>

            {/* Menu */}
            <ul className="flex-1 flex flex-col gap-2 mt-2">
                {menuItems.map((item, index) => {
                    const isActive = currentPage === item.key;

                    return (
                        <li key={index} className="w-full">
                            <button
                                onClick={() => setCurrentPage(item.key)}
                                className={`flex items-center w-full p-2 rounded-lg transition-all duration-300 ease-in-out
                                ${isActive ? "bg-primary/20 text-primary" : "hover:bg-base-300 text-base-content"}`}
                            >
                                {/* Icon */}
                                <div
                                    className={`flex-shrink-0 flex items-center transition-all duration-300 ease-in-out
                                    ${sidebarOpen
                                            ? "justify-center w-14"
                                            : "justify-center w-full"
                                        }`}
                                >
                                    {item.icon}
                                </div>

                                {/* Text */}
                                <span
                                    className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap
                                    ${sidebarOpen ? "ml-2 opacity-100 max-w-full" : "ml-0 opacity-0 max-w-0"}`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Sign Out Button */}
            <div className="mt-auto mb-4 px-1">
                <button
                    onClick={() => console.log("Sign out clicked")}
                    className={`flex items-center w-full p-2 rounded-lg transition-all duration-300 ease-in-out
            hover:bg-red-100 text-red-600`}
                >
                    {/* Icon */}
                    <div
                        className={`flex-shrink-0 flex items-center transition-all duration-300 ease-in-out
                ${sidebarOpen ? "justify-center w-14" : "justify-center w-full"}`}
                    >
                        <LogOut size={24} />
                    </div>

                    {/* Text */}
                    <span
                        className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap
                ${sidebarOpen ? "ml-2 opacity-100 max-w-full" : "ml-0 opacity-0 max-w-0"}`}
                    >
                        Sign Out
                    </span>
                </button>
            </div>


            <div className="border-t border-base-300" />
        </div>
    );
};

export default Sidebar;
