# LiquidStake Loans — Shariah-Compliant DeFi Lending (Prototype)

A prototype for a **Shariah-compliant lending flow** where users borrow without interest (0% interest), using liquid-staked collateral. The idea is that yield/rewards can offset costs rather than charging riba.

This repo contains:
- a frontend app (React + Vite)
- a `contracts/` directory for protocol logic scaffolding

## Core Idea
- Deposit liquid-staked collateral
- Borrow against it at **0% interest**
- Track collateral health (over-collateralization)
- Design aims for transparency + predictable rules

## Tech Stack
- React + TypeScript (Vite)
- Smart contract scaffolding in `contracts/`

## Run Locally
```bash
npm install
npm run dev
