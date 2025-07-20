import { Snowflake } from "discord.js";
import { UserData, UserStore } from "./store";

export type StoreUserDataDTO = {
    private_key_data: string,
    delegation_data: string,
    principal: string,
}

export class UserServiceClass {
    async store_user_details(discord_id: Snowflake, data: StoreUserDataDTO) {
        await UserStore.store({
            ...data,
            discord_id
        });
    }

    async list_all_users(): Promise<UserData[]> {
        return await UserStore.users();
    }
}

export const UserService = new UserServiceClass();