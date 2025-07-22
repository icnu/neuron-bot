import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { RegisterButton, RegisterSlashCommand } from "../commands";

async function neuronAuthenticateMessageHandler(interaction: ChatInputCommandInteraction) {
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

async function neuronTokenLoginHandler(interaction: ButtonInteraction) {
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

const commands: RegisterSlashCommand[] = [
    {
        command: new SlashCommandBuilder()
            .setName('display_login_message')
            .setDescription('Shows Login Message for users'),
        handler: neuronAuthenticateMessageHandler
    }
];

const buttons: RegisterButton[] = [
    {
        id: 'neuron_token_login',
        handler: neuronTokenLoginHandler
    }
];

export default {
    commands,
    buttons
}