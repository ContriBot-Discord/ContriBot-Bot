import {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { ContributionUser, SlashCommand } from "@/types";
import { contribution } from "../index";

export const command: SlashCommand = {
  name: "leaderboardpoint",
  data: new SlashCommandBuilder()
    .setName("leaderboardpoint")
    .setDescription("Show the leaderboard of total contribution point"),
  async execute(interaction: CommandInteraction<CacheType>) {
    const embed = new EmbedBuilder()
      .setTitle("Leaderboard [1]")
      .setDescription(`Here is the leaderboard of total contribution points.`)
      .setColor("#0000ff")
      .setTimestamp();

    contribution.sort((a, b) => b.allContributionPoint - a.allContributionPoint);

    for (let i = 0; i < 9; i++) {
      const user: ContributionUser = contribution.get(contribution.keyAt(i)!)!;
      if (user) {
        embed.addFields({
          name: `Top ${i + 1} : `,
          value: `<@${user.userId}> with **${user.allContributionPoint}** total contribution points`,
        });
      }
    }

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("previous").setEmoji("⬅️").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("next").setEmoji("➡️").setStyle(1)
      );

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
