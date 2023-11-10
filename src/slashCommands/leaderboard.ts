import {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import leaderboard from "@/embeds/leaderboard";

export const command: SlashCommand = {
  name: "leaderboard",
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the leaderboard of users"),
  async execute(interaction: CommandInteraction<CacheType>) {

    const guild = DB.getGuild(interaction.guildId!);

    // Copied list of the guild users
    let users = [...guild.users];

    const fields: {name:string, value:string}[] = [];

    users.sort((a, b) => b.getContribPoint("leaderboardPoints") - a.getContribPoint("leaderboardPoints"));

    // Add the first 10 users to the embed
    for (let i = 0; i < 9; i++) {
      const user = users[i];
      if (user) {
        fields.push({
          name: ` `,
          value: `**#${i + 1} ·** <@${user.id}> · **${user.getContribPoint(
            "leaderboardPoints"
          )}** points`,
        });
      }
    }

    // Generate the embed
    const embed = leaderboard(1, Math.ceil(guild.users.length / 10), fields, guild.lang);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("previous")
          .setLabel("◀︎")
          .setStyle(1)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("next").setLabel("▶").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("refresh").setLabel("⟲").setStyle(1)
      );

    // If there are less than 10 users, disable the "next" button
    if (guild.users.length <= 10) button.components[1].setDisabled(true);

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
