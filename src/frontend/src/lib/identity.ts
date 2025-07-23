import { AuthClient, IdbStorage } from "@dfinity/auth-client";

export const KEY_STORAGE_KEY = 'identity';
export const KEY_STORAGE_DELEGATION = 'delegation';
const _storage: IdbStorage = new IdbStorage();

export function getStorage(): IdbStorage {
    return _storage;
}

export async function saveIdentity(authClient: AuthClient) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if ( !token ) return;

    const private_key_data = await _storage.get(KEY_STORAGE_KEY);
    const delegation_data = await _storage.get(KEY_STORAGE_DELEGATION);
    const principal = authClient.getIdentity().getPrincipal().toText()!;
    const res = await fetch(`${import.meta.env.VITE_DISCORD_PROXY_HOSTNAME}/api/token_auth?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            private_key_data,
            delegation_data,
            principal,
        })
    });

    console.log(await res.json());
}