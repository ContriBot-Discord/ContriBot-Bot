import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import leaderboardEmbed from "@embeds/leaderboard";
import leaderboardButton from "@/builders/buttons/leaderboard";

export const command: SlashCommand = {
  name: "leaderboard",
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the leaderboard of users"),

  async execute(interaction: CommandInteraction) {
    const guild = DB.getGuild(interaction.guildId!);

    // Copied list of the guild users
    let users = [...guild.users];

    // Generate the embed
    const embed = leaderboardEmbed(
      1,
      Math.ceil(guild.users.length / 10),
      users,
      guild.lang,
      guild.pointName
    );

    const button = leaderboardButton();

    // If there are less than 10 users, disable the "next" button
    button.components[0].setDisabled(true);
    if (guild.users.length <= 10) button.components[1].setDisabled(true);

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};