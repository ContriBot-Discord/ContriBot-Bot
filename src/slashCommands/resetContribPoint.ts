import { SlashCommandBuilder, EmbedBuilder, CacheType, CommandInteraction, SlashCommandBooleanOption, SlashCommandUserOption } from "discord.js"
import { SlashCommand } from "@/types";

import { resetPoints } from "../utils/contribFunctions";

export const command: SlashCommand = {
    name: 'resetcontribpoint',
    data: new SlashCommandBuilder()
        .setName("resetcontribpoint")
        .setDescription("Reset contribution points of a user")
        .addUserOption((option: SlashCommandUserOption) =>
            option
                .setName("membre")
                .setDescription("Member you want to reset contribution points of")
                .setRequired(true)
            )
            .addBooleanOption((option: SlashCommandBooleanOption) =>
                option
                    .setName("all")
                    .setDescription("Whether to reset all contribution points or not.")
                    .setRequired(false)
                ),
    async execute(interaction: CommandInteraction<CacheType>) {
        const memberId = interaction.options.getUser("membre")!.id;
        const all = interaction.options.get("all")?.value as boolean;

        const embed = new EmbedBuilder()
            .setTitle("Reset points")
            .setDescription(`<@${memberId}>'s contribution points have been reset by <@${interaction.user.id}.`)
            .setColor("#0000ff")
            .setTimestamp();

        if (all) embed.setDescription(`<@${memberId}>'s total contribution points have been reset.`);

        resetPoints(memberId, all);

        await interaction.reply({ embeds: [embed] });
    },
}