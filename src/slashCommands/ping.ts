import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";

import i18n from "i18next";

export const command: SlashCommand = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the bot's ping"),
  execute: async (interaction: CommandInteraction<CacheType>) => {

    const sent = await interaction.reply({
      fetchReply: true,
      embeds: [
        new EmbedBuilder()
          .setDescription(i18n.t("commands:ping.embed.description", { ping: '...' }))
          .setColor("#ff8e4d")
      ],
    });

    await  interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(i18n.t("commands:ping.embed.description", { ping: sent.createdTimestamp - interaction.createdTimestamp }))
          .setColor("#ff8e4d")
      ],
    });
  },
};
