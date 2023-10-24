import {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../types";
import {DB} from "../index";

export const command: SlashCommand = {
  name: "leaderboardpoint",
  data: new SlashCommandBuilder()
    .setName("leaderboardpoint")
    .setDescription("Show the leaderboard of total contribution point"),
  async execute(interaction: CommandInteraction<CacheType>) {
    const lineString: string = `<:lineviolett:1163753428317638696>`.repeat(6);

    const guild = DB.getGuild(interaction.guildId!);

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shinypurplestar:1163585447201607781> Leaderboard",
        value: lineString,
      })
      .setColor("#aa54e1")
      .setFooter({ text: `Page 1/${Math.ceil(guild.users.length / 10)}` })
      .setTimestamp();

    // Copied list of the guild users
    let users = [...guild.users]

    users.sort(
      (a, b) => b.getContribPoint(true) - a.getContribPoint(true)
    );

    for (let i = 0; i < 9; i++) {
      const user = users[i];
      if (user) {
        embed.addFields({
          name: ` `,
          value: `**#${i + 1} ·** <@${user.id}> · **${
            user.getContribPoint(true)
          }** points`,
        });
      }
    }

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("previous").setLabel("◀︎").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("next").setLabel("▶").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("refresh").setLabel("⟲").setStyle(1)
      );

    button.components[0].setDisabled(true);

    if (guild.users.length <= 10) button.components[1].setDisabled(true);

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
