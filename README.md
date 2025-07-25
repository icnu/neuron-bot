# SNS Discord Integration


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
