/**
 * Company Search Dropdown Component
 * Provides searchable dropdown with company information
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Star } from 'lucide-react';
import { CompanyInfo, searchCompanies } from '../data/companyData';
import { CompanyWiki } from './CompanyWiki';

interface CompanySearchProps {
  onCompanySelect?: (company: CompanyInfo) => void;
  placeholder?: string;
  className?: string;
}

export const CompanySearch: React.FC<CompanySearchProps> = ({ 
  onCompanySelect, 
  placeholder = "Search companies...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanyInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);
  const [showWiki, setShowWiki] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search companies when query changes
  useEffect(() => {
    if (query.length > 0) {
      const searchResults = searchCompanies(query);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleCompanySelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleCompanySelect = (company: CompanyInfo) => {
    setSelectedCompany(company);
    setShowWiki(true);
    setQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    if (onCompanySelect) {
      onCompanySelect(company);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Buy': return 'text-green-500';
      case 'Hold': return 'text-yellow-500';
      case 'Sell': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            className="block w-full pl-10 pr-3 py-2 border border-[#2a2a2a] rounded-lg bg-[#0f0f0f] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Dropdown Results */}
        {isOpen && results.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl max-h-96 overflow-y-auto">
            {results.map((company, index) => (
              <div
                key={company.symbol}
                onClick={() => handleCompanySelect(company)}
                className={`p-4 cursor-pointer transition-colors border-b border-[#2a2a2a] last:border-b-0 ${
                  index === highlightedIndex
                    ? 'bg-[#2a2a2a]'
                    : 'hover:bg-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {company.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{company.symbol}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getRatingColor(company.analystRating)} bg-opacity-20`}>
                          {company.analystRating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{company.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{company.sector}</span>
                        <span className="text-xs text-gray-500">{company.marketCap}</span>
                        <span className={`text-xs ${getRiskColor(company.riskLevel)}`}>
                          {company.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">${company.priceTarget}</div>
                    <div className="text-xs text-gray-400">Target</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen && query.length > 0 && results.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl p-4">
            <div className="text-center text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No companies found for "{query}"</p>
              <p className="text-sm mt-1">Try searching by symbol, name, or sector</p>
            </div>
          </div>
        )}
      </div>

      {/* Company Wiki Modal */}
      {selectedCompany && (
        <CompanyWiki
          company={selectedCompany}
          isOpen={showWiki}
          onClose={() => {
            setShowWiki(false);
            setSelectedCompany(null);
          }}
        />
      )}
    </>
  );
};
