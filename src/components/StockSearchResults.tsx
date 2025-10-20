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
    // Tech Giants
    'AAPL': { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: -1.23, changePercent: -0.68, volume: '58.3M', marketCap: '$2.8T' },
    'MSFT': { symbol: 'MSFT', name: 'Microsoft Corporation', price: 372.15, change: 5.89, changePercent: 1.61, volume: '32.1M', marketCap: '$2.8T' },
    'NVDA': { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 456.23, change: 12.45, changePercent: 2.81, volume: '45.2M', marketCap: '$1.1T' },
    'AMZN': { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 142.38, change: -1.24, changePercent: -0.86, volume: '28.7M', marketCap: '$1.5T' },
    'META': { symbol: 'META', name: 'Meta Platforms Inc.', price: 312.45, change: 8.92, changePercent: 2.94, volume: '18.3M', marketCap: '$800B' },
    'GOOG': { symbol: 'GOOG', name: 'Alphabet Inc. Class C', price: 138.92, change: 1.47, changePercent: 1.07, volume: '25.4M', marketCap: '$1.7T' },
    'GOOGL': { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', price: 139.15, change: 1.52, changePercent: 1.10, volume: '22.8M', marketCap: '$1.7T' },
    'TSLA': { symbol: 'TSLA', name: 'Tesla, Inc.', price: 258.67, change: 8.92, changePercent: 3.57, volume: '102.5M', marketCap: '$822.1B' },
    
    // Financial & Banking
    'BRK.B': { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc. Class B', price: 345.67, change: 2.34, changePercent: 0.68, volume: '8.2M', marketCap: '$800B' },
    'JPM': { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 145.23, change: 1.89, changePercent: 1.32, volume: '12.4M', marketCap: '$450B' },
    'V': { symbol: 'V', name: 'Visa Inc.', price: 245.78, change: 3.45, changePercent: 1.42, volume: '6.8M', marketCap: '$520B' },
    'MA': { symbol: 'MA', name: 'Mastercard Incorporated', price: 412.56, change: 5.23, changePercent: 1.28, volume: '4.2M', marketCap: '$400B' },
    
    // Healthcare & Pharma
    'UNH': { symbol: 'UNH', name: 'UnitedHealth Group Incorporated', price: 523.45, change: 8.92, changePercent: 1.73, volume: '3.2M', marketCap: '$490B' },
    'JNJ': { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: 1.23, changePercent: 0.79, volume: '8.9M', marketCap: '$420B' },
    'LLY': { symbol: 'LLY', name: 'Eli Lilly and Company', price: 612.34, change: 15.67, changePercent: 2.63, volume: '2.1M', marketCap: '$580B' },
    'PFE': { symbol: 'PFE', name: 'Pfizer Inc.', price: 28.45, change: -0.34, changePercent: -1.18, volume: '45.2M', marketCap: '$160B' },
    'ABBV': { symbol: 'ABBV', name: 'AbbVie Inc.', price: 156.23, change: 2.45, changePercent: 1.59, volume: '8.7M', marketCap: '$280B' },
    
    // Energy & Industrial
    'XOM': { symbol: 'XOM', name: 'Exxon Mobil Corporation', price: 108.45, change: 1.23, changePercent: 1.15, volume: '18.3M', marketCap: '$450B' },
    'CVX': { symbol: 'CVX', name: 'Chevron Corporation', price: 156.78, change: 2.34, changePercent: 1.51, volume: '12.6M', marketCap: '$290B' },
    
    // Consumer & Retail
    'WMT': { symbol: 'WMT', name: 'Walmart Inc.', price: 156.23, change: 1.45, changePercent: 0.94, volume: '8.9M', marketCap: '$520B' },
    'PG': { symbol: 'PG', name: 'The Procter & Gamble Company', price: 145.67, change: 0.89, changePercent: 0.61, volume: '6.2M', marketCap: '$350B' },
    'HD': { symbol: 'HD', name: 'The Home Depot Inc.', price: 312.45, change: 4.23, changePercent: 1.37, volume: '4.8M', marketCap: '$320B' },
    'COST': { symbol: 'COST', name: 'Costco Wholesale Corporation', price: 678.90, change: 8.45, changePercent: 1.26, volume: '2.1M', marketCap: '$300B' },
    'MCD': { symbol: 'MCD', name: 'McDonald\'s Corporation', price: 245.67, change: 2.34, changePercent: 0.96, volume: '3.4M', marketCap: '$180B' },
    'KO': { symbol: 'KO', name: 'The Coca-Cola Company', price: 58.23, change: 0.45, changePercent: 0.78, volume: '12.8M', marketCap: '$250B' },
    
    // Tech & Communication
    'CSCO': { symbol: 'CSCO', name: 'Cisco Systems Inc.', price: 48.56, change: 0.67, changePercent: 1.40, volume: '18.9M', marketCap: '$200B' },
    'ORCL': { symbol: 'ORCL', name: 'Oracle Corporation', price: 112.34, change: 1.89, changePercent: 1.71, volume: '15.2M', marketCap: '$310B' },
    'CRM': { symbol: 'CRM', name: 'Salesforce Inc.', price: 245.67, change: 4.23, changePercent: 1.75, volume: '8.4M', marketCap: '$250B' },
    'AMD': { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', price: 134.56, change: 3.45, changePercent: 2.63, volume: '45.2M', marketCap: '$220B' },
    'INTC': { symbol: 'INTC', name: 'Intel Corporation', price: 42.34, change: 0.89, changePercent: 2.15, volume: '28.7M', marketCap: '$180B' },
    
    // Legacy entries for backward compatibility
    'IBM': { symbol: 'IBM', name: 'International Business Machines Corporation', price: 142.35, change: 2.47, changePercent: 1.77, volume: '4.2M', marketCap: '$131.2B' },
    'APPLE': { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: -1.23, changePercent: -0.68, volume: '58.3M', marketCap: '$2.8T' },
    'TESLA': { symbol: 'TSLA', name: 'Tesla, Inc.', price: 258.67, change: 8.92, changePercent: 3.57, volume: '102.5M', marketCap: '$822.1B' }
  };

  const normalizedQuery = query.trim().toUpperCase();
  const stock = mockStocks[normalizedQuery];

  // Find matching stocks for preview - improved search logic
  const matchingStocks = Object.values(mockStocks).filter(stock => {
    const symbolMatch = stock.symbol.includes(normalizedQuery);
    const nameMatch = stock.name.toUpperCase().includes(normalizedQuery);
    const wordsMatch = stock.name.toUpperCase().split(' ').some(word => 
      word.startsWith(normalizedQuery) && word.length > 2
    );
    return symbolMatch || nameMatch || wordsMatch;
  }).slice(0, 8); // Increased to 8 results for better selection

  // Show preview dropdown if query is long enough and we have matches
  if (query.length >= 1 && matchingStocks.length > 0 && !stock) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden z-50">
        <div className="max-h-64 overflow-y-auto">
          {matchingStocks.map((matchStock, index) => {
            const isPositive = matchStock.change >= 0;
            return (
              <div 
                key={matchStock.symbol}
                className="p-3 hover:bg-[#2a2a2a] cursor-pointer border-b border-[#2a2a2a] last:border-b-0"
                onClick={() => navigate(`/company/${matchStock.symbol}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{matchStock.symbol}</span>
                      <span className="text-xs text-gray-400 truncate">{matchStock.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ${matchStock.price.toFixed(2)} • {matchStock.marketCap}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}{matchStock.change.toFixed(2)}
                    </div>
                    <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}{matchStock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-3 bg-[#0f0f0f] border-t border-[#2a2a2a]">
          <p className="text-xs text-gray-500 text-center">
            Showing {matchingStocks.length} of {Object.keys(mockStocks).length} stocks
          </p>
        </div>
      </div>
    );
  }

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

