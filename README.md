# Neuron Bot

_This project is a part of series of projects, **Neural** for WCHL 2025, meant to make the ICP DAO capabilities accessible to organizations outside ICP. The goal is to establish ICP as the ultimate DAO platform for any needs._

Voting on SNS proposals, Stake-aware Access Controls, Enhanced Community Collaboration, all through Discord now!


## Architecture

<img width="1758" height="1180" alt="image" src="https://github.com/user-attachments/assets/386f2a72-8513-4463-8e29-f36ff322853a" />


The project has 3 components:
- **Registry Canister:** This canister is a clone of the Encrypted Maps canister. It stores the encrypted User Identity data, and verifies the TEE Attestations through a handshake process for access to encrypted values.
- **Proxy Agent:** The off-chain component responsible for establishing websocket communication with Discord servers. Also securely handles the storage of user identity. It runs in a Nitro TEE Enclave for trust.
- **Frontend Canister**

_Note: TEEs have been avoided for this hackathon project because of the high costs. In production, we'll use OracleKit's [nitro-tee-kit](https://github.com/OracleKit/nitro-tee-kit) and [nitro-tee-attestation](https://github.com/OracleKit/nitro-tee-attestation)_

The project uses the following external components:
- **SNS Aggregator:** For up-to-date SNS data
- **Internet Identity:** For authentication

## Deployed Canisters
- Frontend Canister: [bv6mc-zqaaa-aaaam-aenqa-cai](https://dashboard.internetcomputer.org/canister/bv6mc-zqaaa-aaaam-aenqa-cai)
- Registry Canister: [bs7kw-uiaaa-aaaam-aenqq-cai](https://dashboard.internetcomputer.org/canister/bs7kw-uiaaa-aaaam-aenqq-cai)

## Local Setup

Requirements:
- Bash shell
- Node.js (>=16.0.0) with pnpm
- Rust

Create a `.env` file with the following contents:
```bash
DISCORD_BOT_TOKEN=
DISCORD_BOT_CLIENT_ID=
FRONTEND_URL=
VITE_DISCORD_PROXY_HOSTNAME=http://localhost:3000
REGISTRY_CANISTER_ICP_NETWORK_URL=http://localhost:4943
```
Fill your Discord bot client id and token, and the frontend url (either deployed asset canister or vite local instance url).

Then create a `src/discord-proxy/private-key.json` file with the output of the following script:
```js
import { Ed25519KeyIdentity } from '@dfinity/identity';
console.log(JSON.stringify(Ed25519KeyIdentity.generate().toJSON()))
```
This creates a random identity for the `discord-proxy` component, to securely access VetKeys.

To start the project locally, run:
```bash 
dfx start --background --clean
npm run setup
npm run deploy
npm run start:proxy
```
