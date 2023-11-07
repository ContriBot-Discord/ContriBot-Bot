import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import wipeEmbed from "@/embeds/wipe";

export const command: SlashCommand = {
  name: "wipe",
  data: new SlashCommandBuilder()
    .setName("wipe")
    .setDescription("wipe contribution points of all users")
    .addBooleanOption((option: SlashCommandBooleanOption) => {
      return option
        .setName("all")
        .setDescription(
          "Whether to wipe leaderboard points or not. (Default: false)"
        )
        .setRequired(false);
    }),
  async execute(interaction: CommandInteraction<CacheType>) {
    const all = interaction.options.get("all")?.value as boolean;

    const embed = wipeEmbed(all);

    // Reset all users' points in database, and then update the cache
    DB.getGuild(interaction.guildId!).resetPoints();

    await interaction.reply({ embeds: [embed] });
  },
};
