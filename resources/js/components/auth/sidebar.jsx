import { Home, Users, BarChart3, Settings, BookOpen, HelpCircle } from "lucide-react";

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
      className={`hidden md:flex flex-col border-r border-base-300 bg-base-100 transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo Header */}
      <div className="flex items-center justify-center h-16 px-4">
        <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
          L
        </span>
      </div>

      {/* Menu */}
      <ul className="flex-1 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = currentPage === item.key;

          return (
            <li key={index} className="w-full">
              <button
                onClick={() => setCurrentPage(item.key)}
                className={`flex items-center gap-2 p-2 rounded-lg w-full transition-all
                  ${sidebarOpen ? "justify-start px-4" : "justify-center"}
                  ${isActive ? "bg-primary/20 text-primary" : "hover:bg-base-300 text-base-content"}
                `}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Garis bawah */}
      <div className="border-t border-base-300 mt-2" />
    </div>
  );
};

export default Sidebar;
