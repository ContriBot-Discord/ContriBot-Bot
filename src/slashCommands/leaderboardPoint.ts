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
      .addFields({ name: "<:shinybluesparkles:1163503829174734918> Leaderboard", value: "*Here is the leaderboard of total contribution points*" })
      .setColor("#0000ff")
      .setFooter({ text: `Page 1/${Math.ceil(contribution.size / 10)}`})
      .setTimestamp();

    contribution.sort(
      (a, b) => b.allContributionPoint - a.allContributionPoint
    );

    for (let i = 0; i < 9; i++) {
      const user: ContributionUser = contribution.get(contribution.keyAt(i)!)!;
      if (user) {
        embed.addFields({
          name: ` `,
          value: `**#${i+1} ·** <@${user.userId}> · **${user.allContributionPoint}** points`,
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
