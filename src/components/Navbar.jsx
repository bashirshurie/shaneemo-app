import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const tabs = ['Trending', 'Action', 'Sci-Fi', 'Horror'];
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <nav className="w-full h-20 md:h-24 flex justify-between items-center px-4 md:px-10 z-10 sticky top-0 bg-dark-bg/90 backdrop-blur-sm">
        {/* Left side text links & hamburger */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-gray-400 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/action" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Action</Link>
            <Link to="/scifi" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Sci-Fi</Link>
            <Link to="/horror" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Horror</Link>
          </div>
        </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-6">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles..."
            className="bg-transparent text-sm text-white rounded-lg py-2 pl-4 pr-10 w-36 sm:w-48 md:w-64 border-b border-gray-700 focus:outline-none focus:border-primary-accent transition-all"
          />
          <button type="submit" className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <Search className="w-4 h-4 text-gray-300 group-hover:text-primary-accent transition-colors" />
          </button>
        </form>
        
        <button className="relative text-gray-400 hover:text-white transition">
          <Bell className="w-5 h-5 fill-current" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary-accent rounded-full border-2 border-dark-bg"></span>
        </button>
        
        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:ring-2 ring-primary-accent transition overflow-hidden">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 bg-[#0f1115]/98 backdrop-blur-xl z-50 flex flex-col md:hidden shadow-2xl transition-all">
        <div className="flex justify-between items-center px-6 h-20 border-b border-gray-800/50 shrink-0">
          <h2 className="text-xl font-black text-primary-accent tracking-tighter">SHANEEMO</h2>
          <button 
            className="text-gray-400 hover:text-white bg-gray-800/50 p-2 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col py-8 px-8 gap-10 overflow-y-auto pb-24">
          <div>
            <div className="text-[10px] font-bold text-gray-500 tracking-widest mb-5 uppercase">Categories</div>
            <div className="flex flex-col gap-6">
              <Link to="/action" className="text-gray-300 hover:text-white font-bold text-2xl tracking-wide">Action</Link>
              <Link to="/scifi" className="text-gray-300 hover:text-white font-bold text-2xl tracking-wide">Sci-Fi</Link>
              <Link to="/horror" className="text-gray-300 hover:text-white font-bold text-2xl tracking-wide">Horror</Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-500 tracking-widest mb-5 uppercase">Account</div>
            <div className="flex flex-col gap-6">
              <Link to="/settings" className="flex items-center gap-4 text-gray-300 hover:text-white font-bold text-xl">
                <SettingsIcon className="w-6 h-6 text-gray-400" /> Settings
              </Link>
              <button onClick={logout} className="flex items-center gap-4 text-gray-300 hover:text-white font-bold text-xl text-left">
                <LogOut className="w-6 h-6 text-gray-400" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
