import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { resetAllUsersPoints } from "../utils/contribFunctions";

export const command: SlashCommand = {
  name: "resetalluserscontribpoint",
  data: new SlashCommandBuilder()
    .setName("resetalluserscontribpoint")
    .setDescription("Reset contribution points of all users")
    .addBooleanOption((option: SlashCommandBooleanOption) => {
      return option
        .setName("all")
        .setDescription(
          "Whether to reset all contribution points or not. (Default: false)"
        )
        .setRequired(false);
    }),
  async execute(interaction: CommandInteraction<CacheType>) {
    const all = interaction.options.get("all")?.value as boolean;

    const lineString: string = `<:shiny_orange_bar:1163759934702374942>`.repeat(
      12
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Reset all user' points command.",
        value: lineString,
      })
      .addFields({
        name: " ",
        value: `All of the users' contribution points have been reset.`,
      })
      .setColor("#ff8e4d")
      .setTimestamp();

    if (all)
      embed.spliceFields(1, 1, {
        name: " ",
        value: `All of the users' total contribution points have been reset.`,
      });

    resetAllUsersPoints(all);

    await interaction.reply({ embeds: [embed] });
  },
};
