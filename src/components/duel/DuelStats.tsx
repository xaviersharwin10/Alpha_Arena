import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

// Simple axios-like wrapper
const axios = {
  get: async (url: string, config?: any) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers
      },
      ...config
    });
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
  }
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface DuelStatsProps {
  duel: any;
}

export const DuelStats: React.FC<DuelStatsProps> = ({ duel }) => {
  const timeRemaining = duel.endTime
    ? Math.max(0, duel.endTime - Math.floor(Date.now() / 1000))
    : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [liveStats, setLiveStats] = useState<any>({
    creator: { currentValue: 0, pnlPercent: 0, trades: 0 },
    opponent: { currentValue: 0, pnlPercent: 0, trades: 0 },
  });

  const [chartData, setChartData] = useState<any[]>([]);
  
  // Track initial values to calculate P&L
  const [initialValues, setInitialValues] = useState<{
    creator: number | null;
    opponent: number | null;
  }>({
    creator: null,
    opponent: null,
  });

  useEffect(() => {
    let isMounted = true;
    let currentRequestId = 0;
    const activeRequests = new Set();

    // Reset initial values when duel changes
    setInitialValues({
      creator: null,
      opponent: null,
    });
    setChartData([]); // Clear chart data for new duel

    const fetchPortfolioValue = async (address: string, requestId: number) => {
      if (activeRequests.has(address)) {
        return 0;
      }
      
      activeRequests.add(address);
      
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio/${address}`, {
          timeout: 10000,
        });
        
        if (!isMounted || requestId !== currentRequestId) {
          return 0;
        }
        
        const responseData = response.data;
        let portfolioValue = 0;
        
        if (responseData.success && responseData.data) {
          const actualData = responseData.data;
          
          if (actualData.totalValue !== undefined) {
            portfolioValue = Number(actualData.totalValue);
          } 
        }
        
        return portfolioValue;
        
      } catch (error) {
        return 0;
      } finally {
        activeRequests.delete(address);
      }
    };

    const fetchLiveStats = async () => {
      if (!isMounted) return;
      
      currentRequestId++;
      const thisRequestId = currentRequestId;
      
      try {
        activeRequests.clear();
        
        let creatorAmount = 0;
        if (duel.creator) {
          creatorAmount = await fetchPortfolioValue(duel.creator, thisRequestId);
        }
        
        if (!isMounted || thisRequestId !== currentRequestId) {
          return;
        }
        
        let opponentAmount = 0;
        if (duel.opponent) {
          opponentAmount = await fetchPortfolioValue(duel.opponent, thisRequestId);
          if(duel.opponent.startsWith("0x0000000000")){
            opponentAmount = 0;
          }
        }
        
        if (!isMounted || thisRequestId !== currentRequestId) {
          return;
        }
        
        // Calculate P&L percentages
        const calculatePnL = (currentValue: number, initialValue: number | null) => {
          if (initialValue === null || initialValue === 0) return 0;
          return ((currentValue - initialValue) / initialValue) * 100;
        };
        
        // Update initial values on first fetch or if they're not set
        let currentInitialValues = initialValues;
        if (currentInitialValues.creator === null && creatorAmount > 0) {
          currentInitialValues = { ...currentInitialValues, creator: creatorAmount };
          setInitialValues(currentInitialValues);
        }
        if (currentInitialValues.opponent === null && opponentAmount > 0 && duel.opponent) {
          currentInitialValues = { ...currentInitialValues, opponent: opponentAmount };
          setInitialValues(currentInitialValues);
        }
        
        // Calculate P&L using current initial values
        const creatorPnL = calculatePnL(creatorAmount, currentInitialValues.creator);
        const opponentPnL = calculatePnL(opponentAmount, currentInitialValues.opponent);
        
        const newStats = {
          creator: {
            currentValue: creatorAmount,
            pnlPercent: creatorPnL,
            // trades: 0,
          },
          opponent: {
            currentValue: opponentAmount,
            pnlPercent: opponentPnL,
            // trades: 0,
          },
        };
        
        setLiveStats(newStats);
        
        const now = new Date();
        const timestamp = now.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        const newDataPoint = {
          time: timestamp,
          creator: creatorAmount,
          opponent: opponentAmount,
          timestamp: now.getTime(),
        };
        
        setChartData(prevData => {
          const newData = [...prevData.slice(-19), newDataPoint];
          return newData;
        });
        
      } catch (error) {
        console.error('Error in fetchLiveStats:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        fetchLiveStats();
      }
    }, 100);
    
    const interval = setInterval(() => {
      if (isMounted) {
        fetchLiveStats();
      }
    }, 60000);
    
    return () => {
      isMounted = false;
      currentRequestId++;
      activeRequests.clear();
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [duel.creator, duel.opponent]);

  useEffect(() => {
    console.log('Chart data updated:', chartData);
  }, [chartData]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Live Battle Stats</h2>

      {duel.status === 'ACTIVE' && (
        <div className="bg-gray-900/50 rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-gray-400">Time Remaining</span>
          </div>
          <div className="text-3xl font-bold text-orange-400 font-mono">
            {formatTime(timeRemaining)}
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-white">Portfolio Value Over Time</h2>
          <span className="text-gray-400 text-sm">
            Data points: {chartData.length}
          </span>
        </div>
        
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="time" 
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip 
                contentStyle={{
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="creator"
                stroke="oklch(70.7% 0.165 254.624)"
                strokeWidth={2}
                dot={{ fill: 'oklch(70.7% 0.165 254.624)', strokeWidth: 2, r: 4 }}
                name="Creator"
              />
              <Line
                type="monotone"
                dataKey="opponent"
                stroke="oklch(70.4% 0.191 22.216)"
                strokeWidth={2}
                dot={{ fill: 'oklch(70.4% 0.191 22.216)', strokeWidth: 2, r: 4 }}
                name="Opponent"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>Loading chart data...</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-400">Creator</h3>
            <div className="text-xs text-gray-400">
              {duel.creator.slice(0, 6)}...{duel.creator.slice(-4)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Initial Value:</span>
              <span className="text-gray-300 text-sm">
                ${initialValues.creator ? Number(initialValues.creator).toLocaleString() : 'Loading...'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Current Value:</span>
              <span className="text-white font-medium">
                ${Number(liveStats.creator.currentValue || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">P&L:</span>
              <div
                className={`flex items-center space-x-1 ${
                  liveStats.creator.pnlPercent >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {liveStats.creator.pnlPercent >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {liveStats.creator.pnlPercent >= 0 ? '+' : ''}
                  {liveStats.creator.pnlPercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* <div className="flex justify-between">
              <span className="text-gray-400">Trades:</span>
              <span className="text-white font-medium">
                {liveStats.creator.trades}
              </span>
            </div> */}
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-red-400">Opponent</h3>
            <div className="text-xs text-gray-400">
              {duel.status === 'ACTIVE' || duel.status === 'RESOLVED'? `${duel.opponent.slice(0, 6)}...${duel.opponent.slice(-4)}`: 'Waiting...' }
            </div>
          </div>

          {duel.status === 'ACTIVE' || duel.status === 'RESOLVED' ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Initial Value:</span>
                <span className="text-gray-300 text-sm">
                  ${initialValues.opponent ? Number(initialValues.opponent).toLocaleString() : 'Loading...'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Current Value:</span>
                <span className="text-white font-medium">
                  ${Number(liveStats.opponent.currentValue || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">P&L:</span>
                <div
                  className={`flex items-center space-x-1 ${
                    liveStats.opponent.pnlPercent >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {liveStats.opponent.pnlPercent >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {liveStats.opponent.pnlPercent >= 0 ? '+' : ''}
                    {liveStats.opponent.pnlPercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* <div className="flex justify-between">
                <span className="text-gray-400">Trades:</span>
                <span className="text-white font-medium">
                  {liveStats.opponent.trades}
                </span>
              </div> */}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>Waiting for opponent...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};