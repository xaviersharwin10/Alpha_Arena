import { oneInchService } from './oneInch.js';

class PortfolioService {
  constructor() {
    this.priceCache = new Map();
    this.portfolioCache = new Map();
    this.CACHE_DURATION = 60000; // 1 minute
  }
async getPortfolioValue(address, timestamp) {
  const cacheKey = `${address}-${timestamp || 'current'}`;
  const cached = this.portfolioCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
    return cached.data;
  }

  try {
    const portfolioData = await oneInchService.getPortfolioValue(address, timestamp);

    // Flatten and sum all value_usd from all protocols
    const tokens = portfolioData.result?.flatMap(p => p.result || []) || [];
    const totalValue = tokens.reduce((sum, item) => sum + Number(item.value_usd || 0), 0);

    const result = {
      address,
      totalValue,
      tokens,
      timestamp: timestamp || Math.floor(Date.now() / 1000)
    };

    this.portfolioCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Portfolio service error:', error);

    if (process.env.NODE_ENV === 'development') {
      return {
        address,
        totalValue: Math.random() * 10000 + 1000,
        tokens: [],
        timestamp: timestamp || Math.floor(Date.now() / 1000)
      };
    }

    throw error;
  }
}


  async getTokenPrice(tokenAddress) {
    const cached = this.priceCache.get(tokenAddress);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.price;
    }

    try {
      const priceData = await oneInchService.getTokenPrice(tokenAddress);
      const price = priceData[tokenAddress] || 0;

      this.priceCache.set(tokenAddress, {
        price,
        timestamp: Date.now()
      });

      return price;
    } catch (error) {
      console.error('Token price error:', error);
      return 0;
    }
  }

  async getDuelLiveStats(duelId) {
    try {
      // This would be implemented with actual duel data
      // For now, return mock live stats
      return {
        duelId,
        creator: {
          currentValue: Math.random() * 10000 + 1000,
          pnlPercent: (Math.random() - 0.5) * 20,
          trades: Math.floor(Math.random() * 10)
        },
        opponent: {
          currentValue: Math.random() * 10000 + 1000,
          pnlPercent: (Math.random() - 0.5) * 20,
          trades: Math.floor(Math.random() * 10)
        },
        timeRemaining: Math.floor(Math.random() * 86400), // seconds
        lastUpdate: Date.now()
      };
    } catch (error) {
      console.error('Get duel live stats error:', error);
      throw error;
    }
  }

  clearCache() {
    this.priceCache.clear();
    this.portfolioCache.clear();
  }
}

export const portfolioService = new PortfolioService();