import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  PermissionFlagsBits,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import resetEmbed from "@/embeds/reset";

export const command: SlashCommand = {
  name: "reset",
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Reset contribution points of a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("membre")
        .setDescription("Member you want to reset contribution points of")
        .setRequired(true)
    )
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
    const memberId = interaction.options.getUser("membre")!.id;
    const scope = interaction.options.get("scope")?.value as string;
    const guild = DB.getGuild(interaction.guildId!)

    const embed = resetEmbed(memberId, scope, guild.lang, guild.pointName);

    guild.getUser(memberId).setPoints(0, scope);

    await interaction.reply({ embeds: [embed] });
  },
};
