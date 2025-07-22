import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, MessageFlags } from "discord.js";

async function neuronAuthenticateMessageHandler(client: Client, interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
        .setTitle("Login Screen")
        .setColor('Aqua')
        .setDescription(
            `You can vote on proposals through Discord!\n\n Click on "Authenticate" below to start the login process.`
        );
    
    const button = new ButtonBuilder()
        .setCustomId('neuron_token_login')
        .setLabel('Authenticate')
        .setStyle(ButtonStyle.Primary);
    
    const row = new ActionRowBuilder().addComponents(button).toJSON();
    
    interaction.reply({
        embeds: [embed],
        components: [row],
    });
}

async function neuronTokenLoginHandler(client: Client, interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
        .setTitle("Complete Login")
        .setColor('Aqua')
        .setDescription(
            `Click on the button below to open up the Login page.`
        );
    
    const button = new ButtonBuilder()
        .setLabel('Login')
        .setStyle(ButtonStyle.Link)
        .setURL('http://localhost:3000');
    
    const row = new ActionRowBuilder().addComponents(button).toJSON();
    
    interaction.reply({
        embeds: [embed],
        components: [row],
        flags: MessageFlags.Ephemeral
    });
}

async function initDiscord(client: Client) {
    await client.application?.commands.create({
        name: 'authenticate_message',
        description: 'pongs you'
    });
}

async function interactionHandlerDiscord(client: Client, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case 'authenticate_message':
                neuronAuthenticateMessageHandler(client, interaction);
        }
    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case 'neuron_token_login':
                neuronTokenLoginHandler(client, interaction);
        }
    }
}

export default {
    initDiscord,
    interactionHandlerDiscord
}