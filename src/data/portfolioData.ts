/**
 * Mock portfolio data for the dashboard
 */

import { Stock, Transaction, PortfolioSummary, PriceHistory } from '../types';

export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 127583.42,
  dailyChange: 2847.32,
  dailyChangePercent: 2.28,
  totalGain: 27583.42,
  totalGainPercent: 27.58
};

export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 178.45,
    dailyChange: 2.35,
    dailyChangePercent: 1.33,
    quantity: 150,
    totalValue: 26767.50
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 372.15,
    dailyChange: 5.82,
    dailyChangePercent: 1.59,
    quantity: 75,
    totalValue: 27911.25
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 138.92,
    dailyChange: 1.47,
    dailyChangePercent: 1.07,
    quantity: 200,
    totalValue: 27784.00
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 142.38,
    dailyChange: -1.23,
    dailyChangePercent: -0.86,
    quantity: 100,
    totalValue: 14238.00
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 258.67,
    dailyChange: 8.92,
    dailyChangePercent: 3.57,
    quantity: 50,
    totalValue: 12933.50
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 456.23,
    dailyChange: 12.45,
    dailyChangePercent: 2.81,
    quantity: 40,
    totalValue: 18249.20
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'buy',
    symbol: 'NVDA',
    quantity: 10,
    price: 445.30,
    date: '2025-10-10T14:32:00Z',
    total: 4453.00
  },
  {
    id: 't2',
    type: 'sell',
    symbol: 'AMZN',
    quantity: 25,
    price: 141.85,
    date: '2025-10-09T11:15:00Z',
    total: 3546.25
  },
  {
    id: 't3',
    type: 'buy',
    symbol: 'TSLA',
    quantity: 15,
    price: 252.40,
    date: '2025-10-08T16:20:00Z',
    total: 3786.00
  },
  {
    id: 't4',
    type: 'buy',
    symbol: 'MSFT',
    quantity: 20,
    price: 368.90,
    date: '2025-10-07T10:45:00Z',
    total: 7378.00
  },
  {
    id: 't5',
    type: 'sell',
    symbol: 'AAPL',
    quantity: 30,
    price: 177.20,
    date: '2025-10-06T13:28:00Z',
    total: 5316.00
  },
  {
    id: 't6',
    type: 'buy',
    symbol: 'GOOGL',
    quantity: 50,
    price: 136.75,
    date: '2025-10-05T09:10:00Z',
    total: 6837.50
  },
  {
    id: 't7',
    type: 'buy',
    symbol: 'AAPL',
    quantity: 40,
    price: 175.80,
    date: '2025-10-04T15:55:00Z',
    total: 7032.00
  }
];

// Generate price history for the last 30 days
const generatePriceHistory = (basePrice: number, volatility: number = 0.02): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const days = 30;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 2 * volatility * basePrice;
    const price = basePrice + randomChange;
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 5000000
    });
  }
  
  return history;
};

export const mockPriceHistories: Record<string, PriceHistory[]> = {
  AAPL: generatePriceHistory(178.45, 0.02),
  MSFT: generatePriceHistory(372.15, 0.015),
  GOOGL: generatePriceHistory(138.92, 0.018),
  AMZN: generatePriceHistory(142.38, 0.022),
  TSLA: generatePriceHistory(258.67, 0.035),
  NVDA: generatePriceHistory(456.23, 0.03)
};

