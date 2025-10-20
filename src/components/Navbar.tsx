/**
 * Navigation bar component with theme toggle, routing links, and search
 * Features auto-hide on scroll down, show on scroll up
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery = '', onSearchChange, showSearch = false }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show at top of page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bg-[#1a1a1a] border-b border-[#2a2a2a] fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-sm bg-[#1a1a1a]/95 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center gap-2 sm:gap-4 h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-lg sm:text-2xl font-serif font-bold text-white">General Exchange</span>
          </div>

          {/* Search Bar (only on homepage) */}
          {showSearch && onSearchChange && (
            <div className="flex-1 max-w-xs sm:max-w-2xl mx-2 sm:mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-[#2a2a2a] dark:border-[#2a2a2a] rounded-lg bg-[#0f0f0f] dark:bg-[#0f0f0f] text-white dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center">
            <Link
              to="/login"
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors font-medium ${
                isActive('/login')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <span className="text-sm sm:text-base">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

