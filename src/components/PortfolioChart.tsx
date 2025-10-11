/**
 * Stock price history chart component using Recharts
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { PriceHistory } from '../types';

interface PortfolioChartProps {
  data: PriceHistory[];
  symbol: string;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ data, symbol }) => {
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(payload[0].payload.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate if the stock is up or down
  const isPositive = data[data.length - 1]?.price >= data[0]?.price;

  return (
    <div className="w-full h-80">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{symbol} Price History</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            stroke="currentColor"
          />
          <YAxis
            domain={['auto', 'auto']}
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            stroke="currentColor"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#22c55e' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

