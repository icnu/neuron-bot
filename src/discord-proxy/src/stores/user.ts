import { Principal } from "@dfinity/principal";
import { get_encrypted_maps } from "../encrypted_maps";

const _mapOwner = Principal.anonymous();
const _mapName = new TextEncoder().encode("user_data");

export type UserData = {
    private_key_data: string,
    delegation_data: string,
    principal: string
};

export class UserStoreClass {
    async store(user_data: UserData) {
        await get_encrypted_maps().setValue(
            _mapOwner,
            _mapName,
            new TextEncoder().encode(user_data.principal),
            new TextEncoder().encode(JSON.stringify(user_data))
        );
    }

    async users(): Promise<UserData[]> {
        const values = await get_encrypted_maps().getValuesForMap(
            _mapOwner,
            _mapName
        );

        return values.map(v => {
            const json = new TextDecoder().decode(v[1]);
            const parsed = JSON.parse(json) as UserData;
            return parsed;
        });
    }
}

export const UserStore = new UserStoreClass();