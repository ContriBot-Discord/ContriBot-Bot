import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import wipeEmbed from "@/embeds/wipe";

export const command: SlashCommand = {
  name: "wipe",
  data: new SlashCommandBuilder()
    .setName("wipe")
    .setDescription("wipe contribution points of all users")
    .addStringOption((option) =>
      option
        .setName("scope")
        .setDescription(
          "Specify the scope: storePoints, leaderboardPoints, or both. (Default: both)"
        )
        .setRequired(false)
        .addChoices(
          {
            name: "storePoints",
            value: "storePoints",
          },
          {
            name: "leaderboardPoints",
            value: "leaderboardPoints",
          },
          {
            name: "both",
            value: "both",
          }
        )
    ),

  async execute(interaction: CommandInteraction<CacheType>) {
    const scope = interaction.options.get("scope")?.value as string;

    const embed = wipeEmbed(scope);

    // Reset all users' points in database, and then update the cache
    DB.getGuild(interaction.guildId!).resetPoints();

    await interaction.reply({ embeds: [embed] });
  },
};
