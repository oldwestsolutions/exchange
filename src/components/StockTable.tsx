/**
 * Stock portfolio table component
 */

import React from 'react';
import { Stock } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockTableProps {
  stocks: Stock[];
  onStockSelect?: (symbol: string) => void;
}

export const StockTable: React.FC<StockTableProps> = ({ stocks, onStockSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Symbol
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm hidden md:table-cell">
              Name
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Price
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Change
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm hidden sm:table-cell">
              Quantity
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">
              Total Value
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.symbol}
              onClick={() => onStockSelect?.(stock.symbol)}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <td className="py-4 px-4">
                <span className="font-bold text-gray-900 dark:text-white">
                  {stock.symbol}
                </span>
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {stock.name}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <span className="text-gray-900 dark:text-white font-medium">
                  ${stock.currentPrice.toFixed(2)}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className={`flex items-center justify-end space-x-1 ${
                  stock.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.dailyChange >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  <span className="font-semibold">
                    {stock.dailyChange >= 0 ? '+' : ''}
                    {stock.dailyChangePercent.toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 text-right text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                {stock.quantity}
              </td>
              <td className="py-4 px-4 text-right">
                <span className="text-gray-900 dark:text-white font-semibold">
                  ${stock.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

