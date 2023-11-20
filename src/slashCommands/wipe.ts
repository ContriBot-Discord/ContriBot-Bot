import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import wipeEmbed from "@/embeds/wipe";

export const command: SlashCommand = {
  name: "wipe",
  data: new SlashCommandBuilder()
    .setName("wipe")
    .setDescription("wipe contribution points of all users")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
    const guild = DB.getGuild(interaction.guildId!);

    const embed = wipeEmbed(scope, guild.lang, guild.pointName);

    // Reset all users' points in database, and then update the cache
    guild.resetPoints();

    await interaction.reply({ embeds: [embed] });
  },
};