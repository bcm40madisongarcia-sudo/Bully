import { TradingAgent } from './agent/trader';

async function main(): Promise<void> {
  try {
    const agent = new TradingAgent();
    await agent.start();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
