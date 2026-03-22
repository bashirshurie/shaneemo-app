import { NavLink } from "react-router-dom";
import { Home, Film, Tv, List, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const mainLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Movies", path: "/movies", icon: <Film className="w-5 h-5" /> },
    { name: "Series", path: "/series", icon: <Tv className="w-5 h-5" /> },
    { name: "My List", path: "/mylist", icon: <List className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex w-64 h-screen bg-dark-surface flex-col justify-between py-8 px-6 border-r border-gray-800/30 sticky top-0 shrink-0">
      <div>
        <div className="mb-10 pl-2">
          <h1 className="text-3xl font-black text-primary-accent tracking-tighter mb-8">
            SHANEEMO
          </h1>

          <div className="text-[10px] font-bold text-gray-500 tracking-widest mb-3 uppercase">
            Account
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fde1d3] flex items-center justify-center overflow-hidden border-2 border-primary-accent/20">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">
                {user?.name || "Welcome back"}
              </div>
              <div className="text-xs text-primary-accent font-semibold">
                {user?.plan ? `${user.plan} Member` : "Premium Member"}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {mainLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-gray-800/50 text-primary-accent"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                }`
              }
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-6">
        <button className="w-full bg-gradient-to-r from-pink-500 to-primary-accent text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition">
          UPGRADE TO PRO
        </button>

        <div className="flex flex-col mt-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive ? "bg-gray-800/80 text-primary-accent" : "text-gray-400 hover:text-white hover:bg-gray-800/30"}`
            }
          >
            <Settings className="w-4 h-4" /> Settings
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/30 transition-colors text-sm w-full text-left font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
