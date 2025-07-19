import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { createActor } from './declarations/registry-canister';
import { Principal } from '@dfinity/principal';
import { get_encrypted_maps, init_encrypted_maps } from "./encrypted_maps";

(async function main() {
    init_encrypted_maps(createActor(process.env.CANISTER_ID_REGISTRY_CANISTER!, {
        agentOptions: {
            host: 'http://localhost:4943'
        }
    }));
    const encryptedMaps = get_encrypted_maps();
    const mapOwner = Principal.anonymous();
    const mapName = new TextEncoder().encode("passwords");
    const mapKey = new TextEncoder().encode("key");

    // Store an encrypted value
    const value = new TextEncoder().encode("my_secure_password");
    const result = await encryptedMaps.setValue(mapOwner, mapName, mapKey, value);
    console.log(result);

    console.log(await encryptedMaps.getValue(mapOwner, mapName, mapKey));
})();