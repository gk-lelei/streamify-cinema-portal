
import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Bell, Search, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/browse?category=tv' },
    { name: 'Movies', path: '/browse?category=movies' },
    { name: 'New & Popular', path: '/browse?category=new' },
    { name: 'My List', path: '/my-list' },
  ];
  
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
                    className="text-sm text-white/80 hover:text-white transition-all-quick"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className={`relative ${isSearchOpen ? 'w-40 md:w-64' : 'w-0'} transition-all duration-300 ease-in-out`}>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Titles, people, genres..."
                className="w-full py-1 pl-8 pr-2 text-sm text-white bg-black/50 border border-white/20 rounded-sm focus:outline-none focus:border-white/40 placeholder:text-white/60"
                autoFocus
              />
            )}
            <Search 
              className={`w-5 h-5 cursor-pointer ${isSearchOpen ? 'absolute left-2 top-1.5 text-white/70' : 'text-white/80 hover:text-white transition-colors'}`} 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
          
          <Bell className="w-5 h-5 text-white/80 hover:text-white cursor-pointer transition-colors" />
          
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer group">
              <div className="w-7 h-7 rounded bg-primary/80 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className="w-4 h-4 text-white ml-1 group-hover:rotate-180 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
