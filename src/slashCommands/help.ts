import { SlashCommand } from "@/types";

import { ActionRowBuilder, ButtonBuilder, CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";

import helpEmbed from "@/embeds/help";

import { DB } from "..";

export const command: SlashCommand = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show the help menu."),
  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    const embed = helpEmbed(guild.lang, guild.pointName);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Hprevious")
          .setLabel("◀︎")
          .setStyle(1)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("Hnext").setLabel("▶").setStyle(1)
      )

    interaction.reply({ embeds: [embed], components: [button] });
  },
};
