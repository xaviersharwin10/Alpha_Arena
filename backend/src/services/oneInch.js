import axios from 'axios';

class OneInchService {
  constructor() {
    this.baseURL = 'https://api.1inch.dev';
    this.chainId = process.env.CHAIN_ID;
    this.apiKey = process.env.ONEINCH_API_KEY;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  async getSwapQuote({ src, dst, amount }) {
    try {
      const response = await this.client.get(`/swap/v6.1/${this.chainId}/quote`, {
        params: {
          src,
          dst,
          amount
        }
      });

      return response.data;
    } catch (error) {
      console.error('1inch quote error:', error.response?.data || error.message);
      throw new Error(`Failed to get swap quote: ${error.response?.data?.description || error.message}`);
    }
  }

  async getSwapTransaction({ src, dst, amount, from, slippage = 1 }) {
    try {
      const response = await this.client.get(`/swap/v6.1/${this.chainId}/swap`, {
        params: {
          src,
          dst,
          amount,
          from,
          slippage
        }
      });

      return response.data;
    } catch (error) {
      console.error('1inch swap error:', error.response?.data || error.message);
      throw new Error(`Failed to get swap transaction: ${error.response?.data?.description || error.message}`);
    }
  }

  async getSupportedTokens() {
    try {
      console.log("point a")
      const response = await this.client.get(`/swap/v6.1/${this.chainId}/tokens`);
      console.log("test token address")
      return response.data.tokens;
    } catch (error) {
      console.error('1inch tokens error:', error.response?.data || error.message);
      throw new Error(`Failed to get supported tokens: ${error.message}`);
    }
  }

  async getTokenPrice(tokenAddress) {
    try {
      const response = await this.client.get(`/price/v1.1/${this.chainId}/${tokenAddress}`);
      return response.data;
    } catch (error) {
      console.error('1inch price error:', error.response?.data || error.message);
      throw new Error(`Failed to get token price: ${error.message}`);
    }
  }

  async getPortfolioValue(address, timestamp) {
    try {
      const params = { addresses: address };
      if (timestamp) {
        params.timestamp = timestamp;
      }
      const response = await this.client.get(`/portfolio/portfolio/v4/overview/erc20/current_value`, {
        params
      });

      return response.data;
    } catch (error) {
      console.error('1inch portfolio error:', error.response?.data || error.message);
      throw new Error(`Failed to get portfolio value: ${error.message}`);
    }
  }
}

export const oneInchService = new OneInchService();