import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { createActor } from './declarations/registry-canister';
import { Principal } from '@dfinity/principal';
import { get_encrypted_maps, init_encrypted_maps } from "./encrypted_maps";
import { v7 } from 'uuid';
import { ulid } from 'ulid';

(async function main() {
    init_encrypted_maps();
    const encryptedMaps = get_encrypted_maps();
    const mapOwner = Principal.anonymous();
    const mapName = new TextEncoder().encode("passwords");
    const mapKey = new TextEncoder().encode(ulid());
    // console.log(v7());
    // console.log(ulid());
    // return;

    // Store an encrypted value
    const value = new TextEncoder().encode("my_secure_passwordmy_secure_passwordmy_secure_password");
    const result = await encryptedMaps.setValue(mapOwner, mapName, mapKey, value);
    console.log(result);

    console.log(await encryptedMaps.getValue(mapOwner, mapName, mapKey));
})();