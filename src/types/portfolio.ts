/**
 * Type definitions for portfolio and investment data
 */

export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  quantity: number;
  totalValue: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  date: string;
  total: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface PriceHistory {
  date: string;
  price: number;
  volume?: number;
}

export interface StockDetails {
  symbol: string;
  name: string;
  currentPrice: number;
  priceHistory: PriceHistory[];
}

