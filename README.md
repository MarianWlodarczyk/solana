# Anchor counter example (Solana)

This repository contains a minimal Anchor-based Solana program that implements a counter with `initialize`, `increment`, and `decrement` instructions, and a small TypeScript script to interact with it.

Prerequisites
- Rust (1.64+ recommended)
- Solana CLI (solana)
- Anchor (npm install -g @project-serum/anchor-cli)
- Node.js & npm/yarn

Quick steps (localnet)
1. Start a local validator:
   - solana-test-validator

2. Configure Anchor to use localnet (Anchor.toml already sets provider.cluster = "localnet").

3. Build & deploy:
   - anchor build
   - anchor deploy

   After `anchor deploy`, Anchor will create the program ID and write the IDL into `target/idl/counter.json`.

4. Run the interaction script:
   - cd to repo root
   - npm install
   - npx ts-node scripts/interact.ts

What the program does
- initialize: creates a counter account and sets count to 0
- increment: increments count by 1
- decrement: decrements count by 1

Notes
- If you deploy to devnet or testnet, update `Anchor.toml` provider.cluster and set an appropriate payer/keypair.
- Replace the `declare_id!()` in `programs/counter/src/lib.rs` with the real program id if you prefer to keep it fixed; Anchor will print the deployed program id after `anchor deploy`.