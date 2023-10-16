import { BotEvent, ContributionUser } from "../types";
import {
  Events,
  Interaction,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} from "discord.js";

import { contribution } from "../index";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    if (
      !(interaction.customId === "previous" || interaction.customId === "next")
    )
      return;

    const actualPageInt: number = parseInt(
      interaction.message.embeds[0].title!.split("[")[1].split("]")[0]
    );

    const embed = new EmbedBuilder()
      .setTitle(`Leaderboard [${actualPageInt + 1}]`)
      .setDescription(`Here is the leaderboard of contribution points.`)
      .setColor("#0000ff")
      .setTimestamp();

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("previous").setEmoji("⬅️").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("next").setEmoji("➡️").setStyle(1)
      );

    contribution.sort((a, b) => b.contributionPoint - a.contributionPoint);

    if (interaction.customId === "previous") {
      if (actualPageInt == 1) {
        await interaction.reply({
          content: "You can't go back !",
          ephemeral: true,
        });
      } else {
        embed.setTitle(`Leaderboard [${actualPageInt - 1}]`);

        const startIndex: number = (actualPageInt - 2) * 10;
        const endIndex: number = startIndex + 10;

        for (let i = startIndex; i < endIndex; i++) {
          const user: ContributionUser = contribution.get(
            contribution.keyAt(i)!
          )!;
          if (user) {
            embed.addFields({
              name: `Top ${i + 1} : `,
              value: `<@${user.userId}> with **${user.contributionPoint}** contribution points`,
            });
          }
        }

        await interaction.message.edit({
          embeds: [embed],
          components: [button],
        });

        await interaction.deferUpdate();
      }
    } else {
      if (actualPageInt * 10 + 1 > contribution.size) {
        await interaction.reply({
          content: "You can't go further",
          ephemeral: true,
        });
      } else {
        const startIndex = actualPageInt * 10;
        const endIndex =
          startIndex + 10 > contribution.size
            ? contribution.size
            : startIndex + 10;

        for (let i = startIndex; i < endIndex; i++) {
          const user: ContributionUser = contribution.get(
            contribution.keyAt(i)!
          )!;
          if (user) {
            embed.addFields({
              name: `Top ${i + 1} : `,
              value: `<@${user.userId}> with **${user.contributionPoint}** contribution points`,
            });
          }
        }

        await interaction.message.edit({
          embeds: [embed],
          components: [button],
        });

        await interaction.deferUpdate();
      }
    }
  },
};

export default event;
