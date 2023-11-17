import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import getEmbed from "@/embeds/get";

export const command: SlashCommand = {
  name: "get",
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Gets contribution points of a user")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("member")
        .setDescription("Member you want to see contribution points of")
    )
    .addStringOption((option) =>
      option
        .setName("scope")
        .setDescription(
          "Specify the scope: storePoints or leaderboardPoints. (Default: storePoints)"
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
          }
        )
    ),

  async execute(interaction: CommandInteraction<CacheType>) {
    const userId = interaction.options.getUser("member")?.id || interaction.user.id;
    const scope = interaction.options.get("scope")?.value as string;
    const guild = DB.getGuild(interaction.guildId!);
    const amount = guild.getUser(userId).getPoints(scope);

    const embed = getEmbed(
      userId,
      amount,
      scope,
      guild.lang,
      guild.pointName
    );

    await interaction.reply({ embeds: [embed] });
  },
};
