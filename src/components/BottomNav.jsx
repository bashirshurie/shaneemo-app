import { NavLink } from "react-router-dom";
import { Home, Film, Tv, List } from "lucide-react";

export default function BottomNav() {
  const mainLinks = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Movies", path: "/movies", icon: <Film className="w-6 h-6" /> },
    { name: "Series", path: "/series", icon: <Tv className="w-6 h-6" /> },
    { name: "My List", path: "/mylist", icon: <List className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-dark-bg/95 backdrop-blur-md border-t border-gray-800/50 z-50 px-6 py-2 flex justify-between items-center pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
      {mainLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive
                ? "text-primary-accent transform -translate-y-1 drop-shadow-[0_0_8px_rgba(255,82,162,0.5)]"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          {link.icon}
          <span className="text-[10px] font-bold tracking-wider">{link.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
