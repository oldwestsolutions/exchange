/**
 * Greeks calculation service using Black-Scholes model
 * Handles real-time data updates and caching
 */

export interface GreeksData {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  timestamp: number;
}

export interface OptionContract {
  symbol: string;
  strike: number;
  expiration: string;
  type: 'CALL' | 'PUT';
  underlyingPrice: number;
  riskFreeRate: number;
  impliedVolatility: number;
  timeToExpiration: number;
}

class GreeksService {
  private cache = new Map<string, GreeksData>();
  private cacheTTL = 1000; // 1 second TTL
  private websocket: WebSocket | null = null;
  private subscribers = new Set<(data: GreeksData) => void>();

  /**
   * Calculate Greeks using Black-Scholes model
   */
  calculateGreeks(option: OptionContract): GreeksData {
    const { underlyingPrice, strike, timeToExpiration, riskFreeRate, impliedVolatility, type } = option;
    
    if (timeToExpiration <= 0) {
      return {
        delta: type === 'CALL' ? 1 : -1,
        gamma: 0,
        theta: 0,
        vega: 0,
        rho: 0,
        timestamp: Date.now()
      };
    }

    const sqrtT = Math.sqrt(timeToExpiration);
    const d1 = (Math.log(underlyingPrice / strike) + (riskFreeRate + 0.5 * impliedVolatility * impliedVolatility) * timeToExpiration) / (impliedVolatility * sqrtT);
    const d2 = d1 - impliedVolatility * sqrtT;
    
    // Standard normal distribution approximation
    const normCDF = (x: number) => 0.5 * (1 + this.erf(x / Math.sqrt(2)));
    const normPDF = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    
    const delta = type === 'CALL' ? normCDF(d1) : normCDF(d1) - 1;
    const gamma = normPDF(d1) / (underlyingPrice * impliedVolatility * sqrtT);
    const theta = -(underlyingPrice * normPDF(d1) * impliedVolatility) / (2 * sqrtT) - 
                  riskFreeRate * strike * Math.exp(-riskFreeRate * timeToExpiration) * normCDF(d2);
    const vega = underlyingPrice * normPDF(d1) * sqrtT;
    const rho = type === 'CALL' ? 
      strike * timeToExpiration * Math.exp(-riskFreeRate * timeToExpiration) * normCDF(d2) :
      -strike * timeToExpiration * Math.exp(-riskFreeRate * timeToExpiration) * normCDF(-d2);

    return {
      delta,
      gamma,
      theta,
      vega,
      rho,
      timestamp: Date.now()
    };
  }

  /**
   * Error function approximation for normal distribution
   */
  private erf(x: number): number {
    // Abramowitz and Stegun approximation
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  /**
   * Get cached Greeks data or calculate new
   */
  getGreeks(option: OptionContract): GreeksData {
    const cacheKey = `${option.symbol}-${option.strike}-${option.expiration}-${option.type}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached;
    }

    const greeks = this.calculateGreeks(option);
    this.cache.set(cacheKey, greeks);
    return greeks;
  }

  /**
   * Get stocks with highest absolute Delta values
   */
  getHighestDeltaStocks(stocks: any[]): any[] {
    return stocks
      .map(stock => ({
        ...stock,
        delta: this.calculateDeltaFromIV(stock.options.avgIV, stock.volatility)
      }))
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  }

  /**
   * Calculate approximate delta from IV and volatility
   */
  private calculateDeltaFromIV(iv: number, volatility: number): number {
    // Simplified delta calculation based on IV
    const baseDelta = Math.min(0.9, Math.max(0.1, iv * 0.8));
    return volatility > 0.5 ? baseDelta * 1.2 : baseDelta;
  }

  /**
   * Initialize WebSocket connection for real-time updates
   */
  initializeWebSocket(): void {
    if (this.websocket) return;

    // Mock WebSocket - replace with real implementation
    this.websocket = new WebSocket('ws://localhost:8080/greeks');
    
    this.websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.updateGreeks(data);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    this.websocket.onclose = () => {
      this.websocket = null;
      // Reconnect after 5 seconds
      setTimeout(() => this.initializeWebSocket(), 5000);
    };
  }

  /**
   * Update Greeks data and notify subscribers
   */
  private updateGreeks(data: any): void {
    const greeks: GreeksData = {
      delta: data.delta || 0,
      gamma: data.gamma || 0,
      theta: data.theta || 0,
      vega: data.vega || 0,
      rho: data.rho || 0,
      timestamp: Date.now()
    };

    // Update cache
    const cacheKey = `${data.symbol}-${data.strike}-${data.expiration}-${data.type}`;
    this.cache.set(cacheKey, greeks);

    // Notify subscribers
    this.subscribers.forEach(callback => callback(greeks));
  }

  /**
   * Subscribe to Greeks updates
   */
  subscribe(callback: (data: GreeksData) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Close WebSocket connection
   */
  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}

// Export singleton instance
export const greeksService = new GreeksService();
