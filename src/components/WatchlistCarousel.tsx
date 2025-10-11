/**
 * Horizontal scrolling watchlist carousel with pagination controls
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface WatchlistOption {
  id: number;
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  totalValue: number;
  return: string;
}

interface WatchlistCarouselProps {
  options: WatchlistOption[];
}

export const WatchlistCarousel: React.FC<WatchlistCarouselProps> = ({ options }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsPerPageOptions = [3, 6, 12, 24];
  const totalPages = Math.ceil(options.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + itemsPerPage < options.length;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex(Math.max(0, currentIndex - itemsPerPage));
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentIndex(0); // Reset to first page
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const visibleOptions = options.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">Watchlist</h3>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Items per page selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-xs sm:text-sm"
              >
                <span>{itemsPerPage} per page</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              {showDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-lg z-10 min-w-[120px]">
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={`w-full px-3 py-2 text-left text-xs sm:text-sm transition-colors ${
                        itemsPerPage === option
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-[#3a3a3a] hover:text-white'
                      }`}
                    >
                      {option} per page
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Page info */}
            <span className="text-xs sm:text-sm text-gray-400 hidden sm:inline">
              Page {currentPage} of {totalPages}
            </span>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  canGoPrevious
                    ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
                    : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={goToNext}
                disabled={!canGoNext}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  canGoNext
                    ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
                    : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`grid gap-3 sm:gap-4 ${
          itemsPerPage === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          itemsPerPage === 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' :
          itemsPerPage === 12 ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12' :
          'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 2xl:grid-cols-24'
        }`}>
          {visibleOptions.map((option) => {
            const isProfit = option.return.startsWith('+');
            return (
              <div
                key={option.id}
                className={`rounded-lg p-3 sm:p-4 cursor-pointer group border-2 transition-all ${
                  isProfit
                    ? 'bg-green-500/5 border-green-500/30 hover:border-green-500'
                    : 'bg-red-500/5 border-red-500/30 hover:border-red-500'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                    <span className="text-base sm:text-xl font-bold text-white">{option.symbol}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      option.type === 'CALL' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {option.type}
                    </span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                    ${option.strike}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">
                    ${option.totalValue.toLocaleString()}
                  </div>
                  <div className={`text-sm sm:text-lg font-bold ${
                    isProfit ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {option.return}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

