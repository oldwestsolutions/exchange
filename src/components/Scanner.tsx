import React, { useState, useEffect } from 'react';
import { X, Search, Eye, Info } from 'lucide-react';

interface OptionsScannerProps {
  onClose: () => void;
}

interface GreekRange {
  min: number;
  max: number;
  mode: number;
}

interface GreekAnalytics {
  delta: GreekRange;
  gamma: GreekRange;
  theta: GreekRange;
  vega: GreekRange;
  rho: GreekRange;
}

interface OptionsContract {
  id: string;
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  expiration: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  timeValue: number;
  intrinsicValue: number;
  totalValue: number;
  return: string;
  greeks: GreekAnalytics;
  underlyingPrice: number;
  timeToExpiration: number;
}

interface ScannerFilters {
  symbol: string;
  minPrice: string;
  maxPrice: string;
  minVolume: string;
  minOpenInterest: string;
  minDelta: string;
  maxDelta: string;
  minGamma: string;
  maxGamma: string;
  minTheta: string;
  maxTheta: string;
  minVega: string;
  maxVega: string;
  minIV: string;
  maxIV: string;
  contractType: 'ALL' | 'CALL' | 'PUT';
  expirationRange: 'ALL' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
}

export const OptionsScanner: React.FC<OptionsScannerProps> = ({ onClose }) => {
  const [results, setResults] = useState<OptionsContract[]>([]);
  const [filters, setFilters] = useState<ScannerFilters>({
    symbol: '',
    minPrice: '',
    maxPrice: '',
    minVolume: '100',
    minOpenInterest: '50',
    minDelta: '',
    maxDelta: '',
    minGamma: '',
    maxGamma: '',
    minTheta: '',
    maxTheta: '',
    minVega: '',
    maxVega: '',
    minIV: '',
    maxIV: '',
    contractType: 'ALL',
    expirationRange: 'ALL'
  });

  // Risk Engine: Calculate Greek ranges based on market variations
  const calculateGreekRanges = (
    modeDelta: number,
    modeGamma: number,
    modeTheta: number,
    modeVega: number,
    modeRho: number,
    underlyingPrice: number,
    strike: number,
    timeToExpiration: number,
    impliedVolatility: number,
    type: 'CALL' | 'PUT'
  ): GreekAnalytics => {
    // Simulate price variations (±5%)
    const priceVariations = [-0.05, -0.025, 0, 0.025, 0.05];
    // Simulate volatility variations (±20%)
    const volVariations = [-0.20, -0.10, 0, 0.10, 0.20];
    // Simulate time decay (1 day, 1 week, current, 1 week forward)
    const timeVariations = [-7, -1, 0, 1, 7];

    const deltaValues: number[] = [];
    const gammaValues: number[] = [];
    const thetaValues: number[] = [];
    const vegaValues: number[] = [];
    const rhoValues: number[] = [];

    // Calculate Greeks for all combinations
    priceVariations.forEach(priceChange => {
      volVariations.forEach(volChange => {
        timeVariations.forEach(timeChange => {
          const newPrice = underlyingPrice * (1 + priceChange);
          const newVol = impliedVolatility * (1 + volChange);
          const newTime = Math.max(0.01, timeToExpiration + timeChange / 365);

          // Simplified Black-Scholes Greek calculations
          const d1 = (Math.log(newPrice / strike) + (0.05 + 0.5 * newVol * newVol) * newTime) / (newVol * Math.sqrt(newTime));
          const d2 = d1 - newVol * Math.sqrt(newTime);

          // Delta calculation
          const delta = type === 'CALL' ? 
            (0.5 * (1 + erf(d1 / Math.sqrt(2)))) : 
            (0.5 * (1 + erf(d1 / Math.sqrt(2))) - 1);
          
          // Gamma calculation
          const gamma = Math.exp(-d1 * d1 / 2) / (newPrice * newVol * Math.sqrt(2 * Math.PI * newTime));
          
          // Theta calculation
          const theta = -(newPrice * Math.exp(-d1 * d1 / 2) * newVol) / (2 * Math.sqrt(2 * Math.PI * newTime)) - 
                       0.05 * strike * Math.exp(-0.05 * newTime) * (type === 'CALL' ? 
                       (0.5 * (1 + erf(d2 / Math.sqrt(2)))) : 
                       (0.5 * (1 + erf(d2 / Math.sqrt(2))) - 1));
          
          // Vega calculation
          const vega = newPrice * Math.sqrt(newTime) * Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI) / 100;
          
          // Rho calculation
          const rho = strike * newTime * Math.exp(-0.05 * newTime) * (type === 'CALL' ? 
                     (0.5 * (1 + erf(d2 / Math.sqrt(2)))) : 
                     (0.5 * (1 + erf(d2 / Math.sqrt(2))) - 1)) / 100;

          deltaValues.push(delta);
          gammaValues.push(gamma);
          thetaValues.push(theta);
          vegaValues.push(vega);
          rhoValues.push(rho);
        });
      });
    });

    // Helper function for error function approximation
    function erf(x: number): number {
      const a1 =  0.254829592;
      const a2 = -0.284496736;
      const a3 =  1.421413741;
      const a4 = -1.453152027;
      const a5 =  1.061405429;
      const p  =  0.3275911;

      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x);

      const t = 1.0 / (1.0 + p * x);
      const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

      return sign * y;
    }

    return {
      delta: {
        mode: modeDelta,
        min: Math.min(...deltaValues),
        max: Math.max(...deltaValues)
      },
      gamma: {
        mode: modeGamma,
        min: Math.min(...gammaValues),
        max: Math.max(...gammaValues)
      },
      theta: {
        mode: modeTheta,
        min: Math.min(...thetaValues),
        max: Math.max(...thetaValues)
      },
      vega: {
        mode: modeVega,
        min: Math.min(...vegaValues),
        max: Math.max(...vegaValues)
      },
      rho: {
        mode: modeRho,
        min: Math.min(...rhoValues),
        max: Math.max(...rhoValues)
      }
    };
  };

  // Helper function to create contract with Greek analytics
  const createContract = (
    id: string,
    symbol: string,
    type: 'CALL' | 'PUT',
    strike: number,
    expiration: string,
    bid: number,
    ask: number,
    last: number,
    volume: number,
    openInterest: number,
    impliedVolatility: number,
    delta: number,
    gamma: number,
    theta: number,
    vega: number,
    rho: number,
    timeValue: number,
    intrinsicValue: number,
    totalValue: number,
    returnValue: string,
    underlyingPrice: number,
    timeToExpiration: number
  ): OptionsContract => ({
    id,
    symbol,
    type,
    strike,
    expiration,
    bid,
    ask,
    last,
    volume,
    openInterest,
    impliedVolatility,
    delta,
    gamma,
    theta,
    vega,
    rho,
    timeValue,
    intrinsicValue,
    totalValue,
    return: returnValue,
    underlyingPrice,
    timeToExpiration,
    greeks: calculateGreekRanges(delta, gamma, theta, vega, rho, underlyingPrice, strike, timeToExpiration, impliedVolatility, type)
  });

  // Mock options contracts data with Greek analytics
  const mockOptionsContracts: OptionsContract[] = [
    createContract('1', 'AAPL', 'CALL', 190, '2025-01-17', 5.25, 5.35, 5.30, 1250, 8920, 0.28, 0.65, 0.012, -0.08, 0.15, 0.05, 5.30, 0, 530, '+18.2%', 189.95, 0.15),
    createContract('2', 'TSLA', 'PUT', 250, '2025-01-20', 8.70, 8.80, 8.75, 890, 5430, 0.32, -0.45, 0.008, -0.12, 0.22, -0.03, 8.75, 0, 875, '+24.8%', 248.50, 0.18),
    createContract('3', 'NVDA', 'CALL', 900, '2025-01-17', 12.25, 12.35, 12.30, 2100, 12560, 0.35, 0.72, 0.006, -0.15, 0.18, 0.08, 12.30, 0, 1230, '+35.7%', 875.28, 0.15),
    createContract('4', 'MSFT', 'CALL', 380, '2025-01-24', 6.80, 6.90, 6.85, 680, 4560, 0.26, 0.58, 0.010, -0.09, 0.14, 0.06, 6.85, 0, 685, '+15.4%', 378.85, 0.22),
    createContract('5', 'AMZN', 'PUT', 140, '2025-01-17', 4.15, 4.25, 4.20, 320, 2890, 0.30, -0.35, 0.015, -0.06, 0.12, -0.02, 4.20, 0, 420, '-5.3%', 145.86, 0.15),
    createContract('6', 'GOOGL', 'CALL', 145, '2025-01-17', 7.55, 7.65, 7.60, 1450, 8920, 0.33, 0.68, 0.011, -0.11, 0.16, 0.07, 7.60, 0, 760, '+28.9%', 142.56, 0.15),
    createContract('7', 'SPY', 'CALL', 450, '2025-01-17', 3.25, 3.35, 3.30, 3450, 15620, 0.22, 0.55, 0.008, -0.05, 0.10, 0.04, 3.30, 0, 330, '+12.1%', 445.50, 0.15),
    createContract('8', 'QQQ', 'PUT', 380, '2025-01-20', 2.80, 2.90, 2.85, 2100, 7890, 0.25, -0.42, 0.009, -0.07, 0.11, -0.03, 2.85, 0, 285, '+8.7%', 375.20, 0.18)
  ];

  // Filter options contracts based on criteria
  const filterContracts = (contracts: OptionsContract[], filters: ScannerFilters): OptionsContract[] => {
    return contracts.filter(contract => {
      // Symbol filter
      if (filters.symbol && !contract.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) {
        return false;
      }

      // Price filters
      if (filters.minPrice && contract.last < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && contract.last > parseFloat(filters.maxPrice)) {
        return false;
      }

      // Volume filter
      if (filters.minVolume && contract.volume < parseInt(filters.minVolume)) {
        return false;
      }

      // Open Interest filter
      if (filters.minOpenInterest && contract.openInterest < parseInt(filters.minOpenInterest)) {
        return false;
      }

      // Delta filters
      if (filters.minDelta && contract.delta < parseFloat(filters.minDelta)) {
        return false;
      }
      if (filters.maxDelta && contract.delta > parseFloat(filters.maxDelta)) {
        return false;
      }

      // Gamma filters
      if (filters.minGamma && contract.gamma < parseFloat(filters.minGamma)) {
        return false;
      }
      if (filters.maxGamma && contract.gamma > parseFloat(filters.maxGamma)) {
        return false;
      }

      // Theta filters
      if (filters.minTheta && contract.theta < parseFloat(filters.minTheta)) {
        return false;
      }
      if (filters.maxTheta && contract.theta > parseFloat(filters.maxTheta)) {
        return false;
      }

      // Vega filters
      if (filters.minVega && contract.vega < parseFloat(filters.minVega)) {
        return false;
      }
      if (filters.maxVega && contract.vega > parseFloat(filters.maxVega)) {
        return false;
      }

      // IV filters
      if (filters.minIV && contract.impliedVolatility < parseFloat(filters.minIV)) {
        return false;
      }
      if (filters.maxIV && contract.impliedVolatility > parseFloat(filters.maxIV)) {
        return false;
      }

      // Contract type filter
      if (filters.contractType !== 'ALL' && contract.type !== filters.contractType) {
        return false;
      }

      return true;
    });
  };

  // Real-time filtering - no manual scan needed
  useEffect(() => {
    const filteredResults = filterContracts(mockOptionsContracts, filters);
    setResults(filteredResults);
  }, [filters]);

  // Update filter
  const updateFilter = (key: keyof ScannerFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };


  // Heat Map Component for Scanner Parameters
  const ScannerHeatMap: React.FC<{
    filters: ScannerFilters;
    onFilterChange: (key: keyof ScannerFilters, value: string) => void;
    results: OptionsContract[];
  }> = ({ filters, onFilterChange, results }) => {
    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
    
    // Define heat map parameters
    const parameters = [
      { key: 'symbol', label: 'Symbol', type: 'text', placeholder: 'AAPL, TSLA...' },
      { key: 'minPrice', label: 'Min Price', type: 'number', placeholder: '0.00' },
      { key: 'maxPrice', label: 'Max Price', type: 'number', placeholder: '100.00' },
      { key: 'minVolume', label: 'Min Volume', type: 'number', placeholder: '100' },
      { key: 'minOpenInterest', label: 'Min OI', type: 'number', placeholder: '50' },
      { key: 'minDelta', label: 'Min Delta', type: 'number', placeholder: '-1.0' },
      { key: 'maxDelta', label: 'Max Delta', type: 'number', placeholder: '1.0' },
      { key: 'minGamma', label: 'Min Gamma', type: 'number', placeholder: '0.000' },
      { key: 'maxGamma', label: 'Max Gamma', type: 'number', placeholder: '0.100' },
      { key: 'minTheta', label: 'Min Theta', type: 'number', placeholder: '-1.0' },
      { key: 'maxTheta', label: 'Max Theta', type: 'number', placeholder: '0.0' },
      { key: 'minVega', label: 'Min Vega', type: 'number', placeholder: '0.00' },
      { key: 'maxVega', label: 'Max Vega', type: 'number', placeholder: '1.00' },
      { key: 'minIV', label: 'Min IV', type: 'number', placeholder: '0.10' },
      { key: 'maxIV', label: 'Max IV', type: 'number', placeholder: '1.00' },
    ];

    // Contract types for future use
    // const contractTypes = [
    //   { key: 'ALL', label: 'All', color: 'bg-gray-500' },
    //   { key: 'CALL', label: 'Calls', color: 'bg-green-500' },
    //   { key: 'PUT', label: 'Puts', color: 'bg-red-500' },
    // ];

    // Calculate heat intensity based on filter values
    const getHeatIntensity = (param: any) => {
      const value = filters[param.key as keyof ScannerFilters];
      if (!value) return 0;
      
      // Convert value to intensity (0-1)
      if (param.type === 'number') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return 0;
        
        // Normalize based on parameter type
        switch (param.key) {
          case 'minPrice':
          case 'maxPrice':
            return Math.min(numValue / 50, 1);
          case 'minVolume':
          case 'minOpenInterest':
            return Math.min(numValue / 1000, 1);
          case 'minDelta':
          case 'maxDelta':
            return Math.min(Math.abs(numValue), 1);
          case 'minGamma':
          case 'maxGamma':
            return Math.min(numValue * 10, 1);
          case 'minTheta':
          case 'maxTheta':
            return Math.min(Math.abs(numValue), 1);
          case 'minVega':
          case 'maxVega':
            return Math.min(numValue, 1);
          case 'minIV':
          case 'maxIV':
            return Math.min(numValue, 1);
          default:
            return 0.5;
        }
      }
      
      return value.length > 0 ? 0.8 : 0;
    };

    const getHeatColor = (intensity: number) => {
      if (intensity === 0) return 'bg-gray-800';
      if (intensity < 0.3) return 'bg-blue-900';
      if (intensity < 0.6) return 'bg-yellow-600';
      if (intensity < 0.8) return 'bg-orange-500';
      return 'bg-red-500';
    };

    return (
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search parameters..."
            className="block w-full pl-10 pr-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Heat Map Grid */}
        <div className="grid grid-cols-4 gap-2">
          {parameters.map((param, index) => {
            const intensity = getHeatIntensity(param);
            const heatColor = getHeatColor(intensity);
            const isSelected = selectedCell?.row === Math.floor(index / 4) && selectedCell?.col === index % 4;
            
            return (
              <div
                key={param.key}
                className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected ? 'border-blue-500' : 'border-transparent'
                } ${heatColor} hover:scale-105`}
                onClick={() => setSelectedCell({ row: Math.floor(index / 4), col: index % 4 })}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-300 font-medium mb-1">{param.label}</div>
                  <div className="text-xs text-white font-bold">
                    {filters[param.key as keyof ScannerFilters] || '—'}
                  </div>
                </div>
                
                {/* Intensity indicator */}
                <div className="absolute top-1 right-1">
                  <div className={`w-2 h-2 rounded-full ${
                    intensity > 0.8 ? 'bg-white' : 
                    intensity > 0.6 ? 'bg-yellow-200' : 
                    intensity > 0.3 ? 'bg-blue-200' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Parameter Input */}
        {selectedCell && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">
                {parameters[selectedCell.row * 4 + selectedCell.col]?.label}
              </span>
              <button
                onClick={() => setSelectedCell(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type={parameters[selectedCell.row * 4 + selectedCell.col]?.type || 'text'}
              placeholder={parameters[selectedCell.row * 4 + selectedCell.col]?.placeholder}
              value={filters[parameters[selectedCell.row * 4 + selectedCell.col]?.key as keyof ScannerFilters] || ''}
              onChange={(e) => onFilterChange(
                parameters[selectedCell.row * 4 + selectedCell.col]?.key as keyof ScannerFilters, 
                e.target.value
              )}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Live Results Preview */}
            {results.length > 0 && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Live Results ({results.length} contracts)</div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.slice(0, 5).map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">{contract.symbol} ${contract.strike} {contract.type}</span>
                      <span className="text-green-400">${contract.last.toFixed(2)}</span>
                    </div>
                  ))}
                  {results.length > 5 && (
                    <div className="text-xs text-gray-500 text-center">+{results.length - 5} more...</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    );
  };

  // Greek Range Display Component (for future use)
  // const GreekRangeDisplay: React.FC<{ 
  //   greek: GreekRange; 
  //   label: string; 
  //   formatValue: (value: number) => string;
  //   color: string;
  // }> = ({ greek, label, formatValue, color }) => {
  //   const range = greek.max - greek.min;
  //   const modePosition = range > 0 ? ((greek.mode - greek.min) / range) * 100 : 50;
  //   
  //   return (
  //     <div className="space-y-1">
  //       <div className="flex items-center justify-between text-xs">
  //         <span className="text-gray-400">{label}</span>
  //         <div className="flex items-center gap-1">
  //           <span className="text-white font-medium">{formatValue(greek.mode)}</span>
  //           <div className="group relative">
  //             <Info className="h-3 w-3 text-gray-500 cursor-help" />
  //             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
  //               Mode: {formatValue(greek.mode)}<br/>
  //               Range: {formatValue(greek.min)} - {formatValue(greek.max)}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
  //         <div 
  //           className={`h-full ${color} opacity-30`}
  //           style={{ width: '100%' }}
  //         />
  //         <div 
  //           className={`absolute top-0 h-full w-1 ${color} opacity-80`}
  //           style={{ left: `${Math.max(0, Math.min(100, modePosition))}%` }}
  //         />
  //       </div>
  //       <div className="flex justify-between text-xs text-gray-500">
  //         <span>{formatValue(greek.min)}</span>
  //         <span>{formatValue(greek.max)}</span>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Options Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Single Column Heat Map */}
        <div className="h-[calc(90vh-80px)] overflow-y-auto">
          <div className="p-4">
            <ScannerHeatMap
              filters={filters}
              onFilterChange={updateFilter}
              results={results}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
