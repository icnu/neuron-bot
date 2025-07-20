import { Snowflake } from "discord.js";
import { v7 } from "uuid";
import { TokenStore } from "./store";

export class TokenServiceClass {
    async get_token_for_user(discord_id: Snowflake): Promise<string> {
        const uuid = v7();
        await TokenStore.store({ discord_id, token_id: uuid });

        return uuid;
    }

    async get_user_from_token(token: string): Promise<Snowflake> {
        const token_data = await TokenStore.get(token);
        if (!token_data) throw new Error("Invalid token");

        return token_data.discord_id;
    }
}

export const TokenService = new TokenServiceClass();