import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { config } from '../config/config';

export class SolanaService {
  private connection: Connection;
  private keypair: Keypair;

  constructor() {
    this.connection = new Connection(config.solana.rpcUrl, config.solana.commitment);
    this.keypair = Keypair.fromSecretKey(
      Buffer.from(config.wallet.privateKey, 'base64')
    );
  }

  getPublicKey(): PublicKey {
    return this.keypair.publicKey;
  }

  async getBalance(): Promise<number> {
    try {
      const balance = await this.connection.getBalance(this.keypair.publicKey);
      return balance / 1_000_000_000; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  async getTokenBalance(mint: string): Promise<number> {
    try {
      const mintPublicKey = new PublicKey(mint);
      const balance = await this.connection.getTokenAccountBalance(mintPublicKey);
      return parseFloat(balance.value.amount);
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw error;
    }
  }

  getConnection(): Connection {
    return this.connection;
  }

  getKeypair(): Keypair {
    return this.keypair;
  }
}
