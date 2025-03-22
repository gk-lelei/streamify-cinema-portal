
import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Bell, Search, ChevronDown, User, FilmIcon, TvIcon, StarIcon, BookmarkIcon, ActivityIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/', icon: ActivityIcon },
    { name: 'TV Shows', path: '/browse?category=tv', icon: TvIcon },
    { name: 'Movies', path: '/browse?category=movies', icon: FilmIcon },
    { name: 'New & Popular', path: '/browse?category=new', icon: StarIcon },
    { name: 'My List', path: '/my-list', icon: BookmarkIcon },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileMenuOpen]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all-smooth px-4 md:px-12 py-3 ${isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-md' : 'bg-transparent nav-gradient-overlay'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="relative">
            <h1 className="text-primary font-bold text-3xl tracking-tighter">STREAMIFY</h1>
            <span className="absolute top-0 -right-4 text-white text-xs">+</span>
          </Link>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`text-sm hover:text-white transition-all-quick ${location.pathname === link.path || (link.path.includes('category') && location.search.includes(link.path.split('=')[1])) ? 'text-white font-medium' : 'text-white/80'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-5">
          <form onSubmit={handleSearch} className={`relative ${isSearchOpen ? 'w-40 md:w-64' : 'w-0'} transition-all duration-300 ease-in-out`}>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Titles, people, genres..."
                className="w-full py-1 pl-8 pr-2 text-sm text-white bg-black/50 border border-white/20 rounded-sm focus:outline-none focus:border-white/40 placeholder:text-white/60"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            <Search 
              className={`w-5 h-5 cursor-pointer ${isSearchOpen ? 'absolute left-2 top-1.5 text-white/70' : 'text-white/80 hover:text-white transition-colors'}`} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </form>
          
          <Link to="/notifications">
            <Bell className="w-5 h-5 text-white/80 hover:text-white cursor-pointer transition-colors" />
          </Link>
          
          <div className="relative">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen(!isProfileMenuOpen);
              }}
            >
              <div className="w-7 h-7 rounded bg-primary/80 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className={`w-4 h-4 text-white ml-1 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-white/10 rounded shadow-lg py-2 z-50 animate-fade-in">
                <Link to="/profile" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Account</Link>
                <Link to="/help" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Help Center</Link>
                <Link to="/admin" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Admin Dashboard</Link>
                <div className="border-t border-white/10 my-1"></div>
                <Link to="/logout" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Sign out</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
