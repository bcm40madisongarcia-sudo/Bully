# Bully - Pump.fun Trading Agent

Autonomous trading agent for Pump.fun built with TypeScript and Solana Web3.js.

## Features

- 🤖 Autonomous trading on Pump.fun
- 🔄 Real-time token monitoring
- 💰 Profit/loss tracking
- 🔐 Secure wallet management
- 📊 Transaction analytics

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Solana wallet with SOL for gas fees
- Pump.fun API token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bcm40madisongarcia-sudo/Bully.git
cd Bully
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Add your credentials to `.env`:
   - `PUMPFUN_TOKEN`: Your Pump.fun API token
   - `SOLANA_RPC_URL`: Solana RPC endpoint
   - `WALLET_PRIVATE_KEY`: Your wallet's private key

### Running the Agent

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## Configuration

See `.env.example` for all available configuration options.

## Project Structure

```
src/
  ├── config/         Configuration management
  ├── agent/          Core bot logic
  ├── services/       Pump.fun & Solana interactions
  ├── models/         Data models & types
  └── index.ts        Entry point
```

## Security

⚠️ **IMPORTANT**: Never commit `.env` files or wallet private keys to version control. Use GitHub Secrets for CI/CD.

## License

MIT
