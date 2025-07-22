import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { RegisterSlashCommand } from "../commands";
import { SnsAggregatorService } from "../snsaggregator";
import { GovernanceService } from "./service";

async function demoPrintProposalHandler(interaction: ChatInputCommandInteraction) {
    const snsName = interaction.options.getString('sns', true);
    const sns = await SnsAggregatorService.resolveSnsByName(snsName);
    if ( !sns ) {
        await interaction.reply({
            content: "Invalid SNS Name."
        });
        return;
    }

    const proposal = await GovernanceService.listLastProposal(sns.governance_canister_id);
    const embed = new EmbedBuilder()
        .setTitle('Motion')
        .setDescription(`
            ## ${proposal.proposal[0]?.title ?? ""}
            ${proposal.proposal[0]?.summary.replace('<br>', '\n') ?? ""}

            🟩🟩🟩🟩🟩           43.20%
            🟥🟥🟥              21.35%
        `);
    
    await interaction.reply({
        embeds: [embed]
    })
}

const commands: RegisterSlashCommand[] = [
    {
        command: new SlashCommandBuilder()
            .setName('demo_print_proposal')
            .setDescription('Shows Login Message for users')
            .addStringOption(
                option => option
                    .setName('sns')
                    .setDescription('The SNS Name for the proposal')
                    .setRequired(true)
            ),
        handler: demoPrintProposalHandler
    }
];

export default {
    commands
}