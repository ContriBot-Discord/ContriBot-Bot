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
      !(
        interaction.customId === "previous" ||
        interaction.customId === "next" ||
        interaction.customId === "refresh"
      )
    )
      return;

    const actualPageInt: number = parseInt(
      interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shinybluesparkles:1163503829174734918> Leaderboard",
        value: "*Here is the leaderboard of total contribution points*",
      })
      .setColor("#0000ff")
      .setFooter({
        text: `Page ${actualPageInt}/${Math.ceil(contribution.size / 10)}`,
      })
      .setTimestamp();

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

    contribution.sort(
      (a, b) => b.allContributionPoint - a.allContributionPoint
    );

    if (interaction.customId === "previous") {
      embed.setFooter({
        text: `Page ${actualPageInt - 1}/${Math.ceil(contribution.size / 10)}`,
      });

      const startIndex: number = (actualPageInt - 1) * 10;
      const endIndex: number = startIndex + 10;

      for (let i = startIndex; i < endIndex; i++) {
        const user: ContributionUser = contribution.get(
          contribution.keyAt(i)!
        )!;
        if (user) {
          embed.addFields({
            name: ` `,
            value: `**#${i + 1} ·** <@${user.userId}> · **${
              user.allContributionPoint
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(contribution.size / 10))
        button.components[1].setDisabled(true);

      await interaction.message.edit({
        embeds: [embed],
        components: [button],
      });

      await interaction.deferUpdate();
    } else if (interaction.customId === "next") {
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
            name: ` `,
            value: `**#${i + 1} ·** <@${user.userId}> · **${
              user.allContributionPoint
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(contribution.size / 10))
        button.components[1].setDisabled(true);

      await interaction.message.edit({
        embeds: [embed],
        components: [button],
      });

      await interaction.deferUpdate();
    } else {
      const startIndex = (actualPageInt - 1) * 10;
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
            name: ` `,
            value: `**#${i + 1} ·** <@${user.userId}> · **${
              user.allContributionPoint
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(contribution.size / 10))
        button.components[1].setDisabled(true);

      await interaction.message.edit({
        embeds: [embed],
        components: [button],
      });

      await interaction.deferUpdate();
    }
  },
};

export default event;