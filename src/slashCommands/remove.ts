import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import removeEmbed from "@/embeds/remove";

export const command: SlashCommand = {
  name: "remove",
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove contribution points from a user.")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("member")
        .setDescription("The user you want to remove contribution points from.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("amount")
        .setDescription(
          "The amount of contribution points to remove of the user."
        )
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
    const memberId: string = interaction.options.getUser("member")!.id;
    const amount: number = interaction.options.get("amount")!.value as number;
    const scope = interaction.options.get("scope")?.value as string;

    const embed = removeEmbed(amount, memberId, scope);

    DB.getGuild(interaction.guildId!).getUser(memberId).addPoints(-amount, scope);

    await interaction.reply({ embeds: [embed] });
  },
};
