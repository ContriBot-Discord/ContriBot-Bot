import { SlashCommandBuilder, EmbedBuilder, CacheType, CommandInteraction, SlashCommandBooleanOption, SlashCommandUserOption } from "discord.js"
import { SlashCommand } from "@/types";

import { getPoints } from "../utils/contribFunctions";

export const command: SlashCommand = {
    name: 'getcontribpoint',
    data: new SlashCommandBuilder()
    .setName("getcontribpoint")
    .setDescription("Gets contribution points of a user")
    .addUserOption((option: SlashCommandUserOption) =>
        option
            .setName("membre")
            .setDescription("Member you want to see contribution points of")
            .setRequired(true)
        )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
        option
            .setName("all")
            .setDescription("Whether to get all contribution points or not. (Default: false)")
            .setRequired(false)
        ),
    async execute(interaction: CommandInteraction<CacheType>) {
        const memberId = interaction.options.getUser("membre")!.id;
        const all = interaction.options.get("all")?.value as boolean;
        const amount = getPoints(memberId, all);

        const embed = new EmbedBuilder()
            .setTitle("Display points")
            .setDescription(`<@${memberId}> has ${amount} contribution point(s).`)
            .setColor("#0000ff")
            .setTimestamp();

        if (all) embed.setDescription(`<@${memberId}> has ${amount} total contribution point(s).`);

        await interaction.reply({ embeds: [embed] });
    },
}