/**
 * Transaction history list component
 */

import React from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {/* Transaction Type Icon */}
            <div
              className={`p-2 rounded-lg ${
                transaction.type === 'buy'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}
            >
              {transaction.type === 'buy' ? (
                <ArrowDownLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>

            {/* Transaction Details */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 dark:text-white">
                  {transaction.symbol}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    transaction.type === 'buy'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}
                >
                  {transaction.type.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {transaction.quantity} shares @ ${transaction.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Amount and Date */}
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              ${transaction.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDate(transaction.date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

