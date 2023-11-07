import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
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
        .setName("membre")
        .setDescription("Member you want to see contribution points of")
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
    const amount = DB.getGuild(interaction.guildId!)
      .getUser(memberId)
      .getContribPoint(true);

    const embed = getEmbed(memberId, amount, scope);

    await interaction.reply({ embeds: [embed] });
  },
};
