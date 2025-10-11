/**
 * Stock search results component - mock UI until server is connected
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

interface StockSearchResultsProps {
  query: string;
}

export const StockSearchResults: React.FC<StockSearchResultsProps> = ({ query }) => {
  const navigate = useNavigate();
  
  // Mock stock data - will be replaced with server data
  const mockStocks: Record<string, Stock> = {
    'IBM': {
      symbol: 'IBM',
      name: 'International Business Machines Corporation',
      price: 142.35,
      change: 2.47,
      changePercent: 1.77,
      volume: '4.2M',
      marketCap: '$131.2B'
    },
    'APPLE': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 178.45,
      change: -1.23,
      changePercent: -0.68,
      volume: '58.3M',
      marketCap: '$2.8T'
    },
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 178.45,
      change: -1.23,
      changePercent: -0.68,
      volume: '58.3M',
      marketCap: '$2.8T'
    },
    'TESLA': {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 258.67,
      change: 8.92,
      changePercent: 3.57,
      volume: '102.5M',
      marketCap: '$822.1B'
    },
    'TSLA': {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 258.67,
      change: 8.92,
      changePercent: 3.57,
      volume: '102.5M',
      marketCap: '$822.1B'
    }
  };

  const normalizedQuery = query.trim().toUpperCase();
  const stock = mockStocks[normalizedQuery];

  if (!stock && query.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl p-4 z-50">
        <p className="text-gray-400 text-sm text-center">
          No results found for "{query}"
        </p>
        <p className="text-gray-500 text-xs text-center mt-1">
          Server connection pending...
        </p>
      </div>
    );
  }

  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden z-50">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{stock.symbol}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{stock.name}</p>
          </div>
          <Activity className="w-5 h-5 text-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              ${stock.price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Change</p>
            <div className="flex items-center space-x-2">
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className={`text-lg sm:text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)}
                </p>
                <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2a2a2a]">
          <div>
            <p className="text-xs text-gray-500">Volume</p>
            <p className="text-sm font-semibold text-white">{stock.volume}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Market Cap</p>
            <p className="text-sm font-semibold text-white">{stock.marketCap}</p>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/company/${stock.symbol}`)}
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          View Full Details
        </button>
      </div>

      <div className="bg-[#0f0f0f] px-4 py-2 border-t border-[#2a2a2a]">
        <p className="text-xs text-gray-500 text-center">
          💡 Server connection pending - showing mock data
        </p>
      </div>
    </div>
  );
};

