/**
 * Trade Insights API Endpoint
 * Provides real-time market signals with Bollinger Band analytics and game-theory payoff models
 */

export interface TradeSignal {
  id: string;
  symbol: string;
  entry: number;
  exit: number;
  signal: string;
  payoff_score: number;
  confidence: number;
  timestamp: string;
  type: 'LONG' | 'SHORT';
  status: 'ACTIVE' | 'EXPIRED' | 'EXECUTED';
}

export interface TradeInsightsResponse {
  signals: TradeSignal[];
  expired_count: number;
  last_updated: string;
  market_status: 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'AFTER_HOURS';
}

// Mock data generator for high-frequency trading simulation
class TradeInsightsGenerator {
  private symbols = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META', 'GOOGL', 'TSLA', 'GS', 'COIN', 'MSTR', 'IBM', 'JPM', 'V', 'MA'];
  private signalTypes = [
    'Bollinger Breakout Long',
    'Bollinger Reversal Short',
    'Order Book Imbalance Long',
    'Payoff Cluster Entry',
    'Volume Spike Breakout',
    'Support Bounce Long',
    'Resistance Rejection Short',
    'Fibonacci Retracement Long',
    'Moving Average Crossover',
    'RSI Divergence Signal'
  ];
  
  private activeSignals: Map<string, TradeSignal> = new Map();
  private signalCounter = 0;

  generateSignal(): TradeSignal {
    const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    const signalType = this.signalTypes[Math.floor(Math.random() * this.signalTypes.length)];
    const type = Math.random() > 0.5 ? 'LONG' : 'SHORT';
    
    // Generate realistic price ranges based on symbol
    const basePrice = this.getBasePriceForSymbol(symbol);
    const volatility = this.getVolatilityForSymbol(symbol);
    
    const entry = basePrice + (Math.random() - 0.5) * volatility;
    const exit = entry + (Math.random() - 0.5) * volatility * 1.5;
    
    const signal: TradeSignal = {
      id: `signal_${Date.now()}_${++this.signalCounter}`,
      symbol,
      entry: Number(entry.toFixed(2)),
      exit: Number(exit.toFixed(2)),
      signal: signalType,
      payoff_score: Math.random() * 0.4 + 0.6, // 0.6 to 1.0 range
      confidence: Math.random() * 0.2 + 0.8, // 0.8 to 1.0 range
      timestamp: new Date().toISOString(),
      type,
      status: 'ACTIVE'
    };
    
    this.activeSignals.set(signal.id, signal);
    return signal;
  }

  private getBasePriceForSymbol(symbol: string): number {
    const priceMap: Record<string, number> = {
      'AAPL': 180, 'MSFT': 370, 'NVDA': 450, 'AMZN': 140, 'META': 310,
      'GOOGL': 140, 'TSLA': 250, 'GS': 380, 'COIN': 240, 'MSTR': 1200,
      'IBM': 140, 'JPM': 145, 'V': 245, 'MA': 410
    };
    return priceMap[symbol] || 200;
  }

  private getVolatilityForSymbol(symbol: string): number {
    const volatilityMap: Record<string, number> = {
      'AAPL': 5, 'MSFT': 8, 'NVDA': 15, 'AMZN': 6, 'META': 10,
      'GOOGL': 4, 'TSLA': 20, 'GS': 8, 'COIN': 25, 'MSTR': 50,
      'IBM': 3, 'JPM': 4, 'V': 5, 'MA': 6
    };
    return volatilityMap[symbol] || 5;
  }

  getActiveSignals(): TradeSignal[] {
    return Array.from(this.activeSignals.values());
  }

  expireRandomSignals(): TradeSignal[] {
    const expired: TradeSignal[] = [];
    const signalsToExpire = Math.floor(Math.random() * 3); // 0-2 signals expire
    
    for (let i = 0; i < signalsToExpire && this.activeSignals.size > 0; i++) {
      const signalIds = Array.from(this.activeSignals.keys());
      const randomId = signalIds[Math.floor(Math.random() * signalIds.length)];
      const signal = this.activeSignals.get(randomId);
      
      if (signal) {
        signal.status = 'EXPIRED';
        expired.push(signal);
        this.activeSignals.delete(randomId);
      }
    }
    
    return expired;
  }

  // Simulate Bollinger Band calculations
  calculateBollingerBands(price: number, period: number = 20): { upper: number; middle: number; lower: number } {
    const volatility = price * 0.02; // 2% volatility
    const middle = price;
    const upper = middle + (2 * volatility);
    const lower = middle - (2 * volatility);
    
    return { upper, middle, lower };
  }

  // Simulate order book payoff calculations
  calculatePayoffScore(signal: TradeSignal): number {
    const priceMovement = Math.abs(signal.exit - signal.entry);
    const entryPrice = signal.entry;
    const movementPercent = priceMovement / entryPrice;
    
    // Higher movement = higher payoff score
    const baseScore = Math.min(movementPercent * 10, 1.0);
    
    // Add some randomness for realistic simulation
    return Math.min(baseScore + (Math.random() * 0.2), 1.0);
  }
}

// Global generator instance
const generator = new TradeInsightsGenerator();

// Simulate high-frequency updates
let lastUpdate = Date.now();
const UPDATE_INTERVAL = 50; // Update every 50ms for high frequency

export const getTradeInsights = async (): Promise<TradeInsightsResponse> => {
  const now = Date.now();
  
  // Simulate some signals expiring
  if (now - lastUpdate > UPDATE_INTERVAL) {
    generator.expireRandomSignals();
    lastUpdate = now;
  }
  
  // Generate new signals occasionally
  if (Math.random() < 0.3) { // 30% chance of new signal
    generator.generateSignal();
  }
  
  const activeSignals = generator.getActiveSignals();
  
  // Limit to 50 signals as specified
  const limitedSignals = activeSignals.slice(0, 50);
  
  return {
    signals: limitedSignals,
    expired_count: Math.floor(Math.random() * 5),
    last_updated: new Date().toISOString(),
    market_status: 'OPEN' // Simulate market is open
  };
};

// WebSocket simulation for real-time updates
export const createTradeInsightsStream = (onUpdate: (data: TradeInsightsResponse) => void) => {
  const interval = setInterval(async () => {
    try {
      const data = await getTradeInsights();
      onUpdate(data);
    } catch (error) {
      console.error('Error in trade insights stream:', error);
    }
  }, 100); // Update every 100ms
  
  return () => clearInterval(interval);
};

// Export for use in components
export default {
  getTradeInsights,
  createTradeInsightsStream
};
