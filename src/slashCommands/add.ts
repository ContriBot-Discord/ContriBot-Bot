import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
  PermissionFlagsBits,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import addEmbed from "@/embeds/add";

export const command: SlashCommand = {
  name: "add",
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds contribution points to a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
    const guild = DB.getGuild(interaction.guildId!);

    const embed = addEmbed(
      interaction.user.id,
      amount,
      memberId,
      guild.lang,
      scope,
      guild.pointName
    );

    guild.getUser(memberId).addPoints(amount, scope);

    await interaction.reply({ embeds: [embed] });
  },
};
