import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';

export interface Token {
  mint: string;
  name: string;
  symbol: string;
  price: number;
  liquidity: number;
  volume24h: number;
}

export class PumpFunService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.pumpfun.baseUrl,
      headers: {
        Authorization: `Bearer ${config.pumpfun.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getTokens(limit: number = 10): Promise<Token[]> {
    try {
      const response = await this.client.get('/tokens', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      throw error;
    }
  }

  async getToken(mint: string): Promise<Token> {
    try {
      const response = await this.client.get(`/tokens/${mint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching token ${mint}:`, error);
      throw error;
    }
  }

  async buyToken(mint: string, amount: number): Promise<string> {
    try {
      const response = await this.client.post(`/tokens/${mint}/buy`, { amount });
      return response.data.transactionId;
    } catch (error) {
      console.error(`Error buying token ${mint}:`, error);
      throw error;
    }
  }

  async sellToken(mint: string, amount: number): Promise<string> {
    try {
      const response = await this.client.post(`/tokens/${mint}/sell`, { amount });
      return response.data.transactionId;
    } catch (error) {
      console.error(`Error selling token ${mint}:`, error);
      throw error;
    }
  }
}
