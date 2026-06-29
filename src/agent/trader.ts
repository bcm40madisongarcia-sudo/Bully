import { PumpFunService } from '../services/pumpfun.service';
import { SolanaService } from '../services/solana.service';
import { config } from '../config/config';

interface TradePosition {
  mint: string;
  buyPrice: number;
  amount: number;
  timestamp: number;
}

export class TradingAgent {
  private pumpfun: PumpFunService;
  private solana: SolanaService;
  private positions: Map<string, TradePosition> = new Map();

  constructor() {
    this.pumpfun = new PumpFunService();
    this.solana = new SolanaService();
  }

  async start(): Promise<void> {
    console.log(`🤖 Starting ${config.agent.name} trading agent...`);
    console.log(`📊 Wallet: ${this.solana.getPublicKey().toString()}`);

    const balance = await this.solana.getBalance();
    console.log(`💰 Balance: ${balance} SOL`);

    // Main trading loop
    while (true) {
      try {
        await this.executeTradeRound();
        await this.sleep(5000); // 5 second interval
      } catch (error) {
        console.error('Error in trade round:', error);
        await this.sleep(10000);
      }
    }
  }

  private async executeTradeRound(): Promise<void> {
    try {
      const tokens = await this.pumpfun.getTokens(20);

      for (const token of tokens) {
        if (this.shouldBuy(token)) {
          console.log(`📈 Buying ${token.symbol}...`);
          const txId = await this.pumpfun.buyToken(
            token.mint,
            config.agent.maxTransactionAmount
          );
          console.log(`✅ Buy transaction: ${txId}`);

          this.positions.set(token.mint, {
            mint: token.mint,
            buyPrice: token.price,
            amount: config.agent.maxTransactionAmount,
            timestamp: Date.now(),
          });
        }
      }

      // Check existing positions for profit
      await this.checkPositions();
    } catch (error) {
      console.error('Error executing trade round:', error);
    }
  }

  private shouldBuy(token: any): boolean {
    const hasSufficientLiquidity = token.liquidity > 10000;
    const isNotOwned = !this.positions.has(token.mint);
    const hasGoodVolume = token.volume24h > 1000;

    return hasSufficientLiquidity && isNotOwned && hasGoodVolume;
  }

  private async checkPositions(): Promise<void> {
    for (const [mint, position] of this.positions.entries()) {
      try {
        const currentToken = await this.pumpfun.getToken(mint);
        const profitPercentage = ((currentToken.price - position.buyPrice) / position.buyPrice) * 100;

        if (profitPercentage >= config.agent.minProfitThreshold) {
          console.log(`📊 ${currentToken.symbol}: ${profitPercentage.toFixed(2)}% profit ✅`);
          const txId = await this.pumpfun.sellToken(mint, position.amount);
          console.log(`✅ Sell transaction: ${txId}`);
          this.positions.delete(mint);
        }
      } catch (error) {
        console.error(`Error checking position ${mint}:`, error);
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
