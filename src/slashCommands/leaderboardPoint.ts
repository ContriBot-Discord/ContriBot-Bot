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
    const lineString: string = `<:lineviolett:1163753428317638696>`.repeat(6);

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shinypurplestar:1163585447201607781> Leaderboard",
        value: lineString,
      })
      .setColor("#aa54e1")
      .setFooter({ text: `Page 1/${Math.ceil(contribution.size / 10)}` })
      .setTimestamp();

    contribution.sort(
      (a, b) => b.allContributionPoint - a.allContributionPoint
    );

    for (let i = 0; i < 9; i++) {
      const user: ContributionUser = contribution.get(contribution.keyAt(i)!)!;
      if (user) {
        embed.addFields({
          name: ` `,
          value: `**#${i + 1} ·** <@${user.userId}> · **${
            user.allContributionPoint
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

    if (contribution.size <= 10) button.components[1].setDisabled(true);

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
