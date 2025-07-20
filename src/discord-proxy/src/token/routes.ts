import { Client, Interaction } from "discord.js";

async function initDiscord(client: Client) {
    await client.application?.commands.create({
        name: 'ping',
        description: 'pongs you'
    });
}

async function interactionHandlerDiscord(client: Client, interaction: Interaction) {
    console.log(interaction);
}

export default {
    initDiscord,
    interactionHandlerDiscord
}