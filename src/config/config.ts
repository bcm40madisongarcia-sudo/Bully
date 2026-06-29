import dotenv from 'dotenv';

dotenv.config();

export const config = {
  pumpfun: {
    token: process.env.PUMPFUN_TOKEN || '',
    baseUrl: 'https://api.pumpfun.com/v1',
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    commitment: 'confirmed' as const,
  },
  wallet: {
    privateKey: process.env.WALLET_PRIVATE_KEY || '',
  },
  agent: {
    name: process.env.BOT_NAME || 'Bully',
    logLevel: process.env.LOG_LEVEL || 'info',
    maxTransactionAmount: parseFloat(process.env.MAX_TRANSACTION_AMOUNT || '10'),
    minProfitThreshold: parseFloat(process.env.MIN_PROFIT_THRESHOLD || '0.05'),
  },
};
