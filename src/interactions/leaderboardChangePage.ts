import { BotEvent } from "@/types";
import {
  Events,
  Interaction,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} from "discord.js";

import { DB } from "@/index";
import {User} from "@/classes/User";

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

    const lineString: string = `<:lineviolett:1163753428317638696>`.repeat(6);

    const guild = DB.getGuild(interaction.guildId!);

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shinypurplestar:1163585447201607781> Leaderboard",
        value: lineString,
      })
      .setColor("#aa54e1")
      .setFooter({
        text: `Page ${actualPageInt}/${Math.ceil(guild.users.length / 10)}`,
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

    let users = [...guild.users]

    users.sort(
      (a: User, b: User) => b.allPoints - a.allPoints
    );

    if (interaction.customId === "previous") {
      embed.setFooter({
        text: `Page ${actualPageInt - 1}/${Math.ceil(guild.users.length / 10)}`,
      });

      const startIndex: number = (actualPageInt - 1) * 10;
      const endIndex: number = startIndex + 10;

      for (let i = startIndex; i < endIndex; i++) {
        const user = users[i];

        if (user) {
          embed.addFields({
            name: ` `,
            value: `**#${i + 1} ·** <@${user.id}> · **${
              user.allPoints
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(guild.users.length  / 10))
        button.components[1].setDisabled(true);

      await interaction.message.edit({
        embeds: [embed],
        components: [button],
      });

      await interaction.deferUpdate();
    } else if (interaction.customId === "next") {
      const startIndex = actualPageInt * 10;
      const endIndex =
        startIndex + 10 > guild.users.length
            ? guild.users.length
            : startIndex + 10;

      for (let i = startIndex; i < endIndex; i++) {
        const user = users[i];
        if (user) {
          embed.addFields({
            name: ` `,
            value: `**#${i + 1} ·** <@${user.id}> · **${
              user.allPoints
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(guild.users.length / 10))
        button.components[1].setDisabled(true);

      await interaction.message.edit({
        embeds: [embed],
        components: [button],
      });

      await interaction.deferUpdate();
    } else {
      const startIndex = (actualPageInt - 1) * 10;
      const endIndex =
        startIndex + 10 > guild.users.length
          ? guild.users.length
          : startIndex + 10;

      for (let i = startIndex; i < endIndex; i++) {
        const user = users[i];
        if (user) {
          embed.addFields({
            name: ` `,
            value: `**#${i + 1} ·** <@${user.id}> · **${
              user.allPoints
            }** points`,
          });
        }
      }

      if (actualPageInt == 1) button.components[0].setDisabled(true);
      if (actualPageInt == Math.ceil(guild.users.length / 10))
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