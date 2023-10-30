import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import resetAllUsersContribPoint from "@/embeds/resetAllUsersContribPoint";

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

    const embed = resetAllUsersContribPoint(all);

    // Reset all users' points in database, and then update the cache
    DB.getGuild(interaction.guildId!).resetPoints();

    await interaction.reply({ embeds: [embed] });
  },
};
