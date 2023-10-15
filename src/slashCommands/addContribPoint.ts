import { SlashCommandBuilder, EmbedBuilder, CacheType, CommandInteraction, SlashCommandUserOption, SlashCommandIntegerOption } from "discord.js";
import { SlashCommand } from "@/types";

import { addPoints } from "../utils/contribFunctions";

export const command: SlashCommand = {
  name: "addcontribpoint",
  data: new SlashCommandBuilder()
    .setName("addcontribpoint")
    .setDescription("Adds contribution points to a user.")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("member")
        .setDescription("The user you want to add contribution points to.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("amount")
        .setDescription("The amount of contribution points to add to the user.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("all")
        .setDescription("Whether to add to all contribution points or not.")
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId: string = interaction.options.getUser("member")!.id;
    const amount: number = interaction.options.get("amount")!.value as number;
    const all = interaction.options.get("all")?.value as boolean;

    const embed = new EmbedBuilder()
      .setTitle("Add points")
      .setDescription(
        `${interaction.user} added ${amount} contribution points to <@${memberId}>.`
      )
      .setColor("#00ff00")
      .setTimestamp();

    if (all) embed.setDescription(`${interaction.user} added ${amount} total contribution points to <@${memberId}>.`);

    await addPoints(memberId, amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
