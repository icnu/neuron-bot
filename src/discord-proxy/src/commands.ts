import { Token } from './token';
import { ButtonInteraction, ChatInputCommandInteraction, Client, Interaction, SlashCommandBuilder } from "discord.js";

export type CommandHandlerType = (interaction: ChatInputCommandInteraction) => Promise<void>;
export type ButtonHandlerType = (interaction: ButtonInteraction) => Promise<void>;

export type RegisterSlashCommand = {
    command: SlashCommandBuilder,
    handler: CommandHandlerType,
};

export type RegisterButton = {
    id: string,
    handler: ButtonHandlerType
}

let Commands: RegisterSlashCommand[] = [
    ...Token.commands
];
let Buttons: RegisterButton[] = [
    ...Token.buttons
];
let CommandNameToHandlerIndex = new Map<string, CommandHandlerType>();
let ButtonNameToHandlerIndex = new Map<string, ButtonHandlerType>();

export async function registerCommands(client: Client) {
    Commands.forEach(command => {
        CommandNameToHandlerIndex.set(command.command.name, command.handler);
    });

    Buttons.forEach(button => {
        ButtonNameToHandlerIndex.set(button.id, button.handler);
    })

    const promises = Commands.map(async command => {
        await client.application?.commands.create(command.command.toJSON());
    });

    await Promise.all(promises);
}

export async function handlerCommandInteraction(interaction: Interaction) {
    if ( interaction.isChatInputCommand() ) {
        const handler = CommandNameToHandlerIndex.get(interaction.commandName);
        if ( handler ) await handler(interaction);
    } else if ( interaction.isButton() ) {
        const handler = ButtonNameToHandlerIndex.get(interaction.customId);
        if ( handler ) await handler(interaction);
    }
}