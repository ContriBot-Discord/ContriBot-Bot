import { SlashCommandBuilder, EmbedBuilder, CacheType, CommandInteraction, SlashCommandBooleanOption } from "discord.js"
import { SlashCommand } from "@/types";

import { resetAllUsersPoints } from "../utils/contribFunctions";

export const command: SlashCommand = {
    name: 'resetalluserscontribpoint',
    data: new SlashCommandBuilder()
        .setName("resetalluserscontribpoint")
        .setDescription("Reset contribution points of all users")
        .addBooleanOption((option: SlashCommandBooleanOption) => {
            return option
                .setName("all")
                .setDescription("Whether to reset all contribution points or not.")
                .setRequired(false)
        }),
    async execute(interaction: CommandInteraction<CacheType>) {
        const all = interaction.options.get("all")?.value as boolean;

        const embed = new EmbedBuilder()
            .setTitle("Reset points")
            .setDescription(`<@${interaction.user.id}> has reset all users' contribution points.`)
            .setColor("#0000ff")
            .setTimestamp();

        if (all) embed.setDescription(`<@${interaction.user.id}> has reset all users' total contribution points.`);

        resetAllUsersPoints(all);

        await interaction.reply({ embeds: [embed] });
    },
}