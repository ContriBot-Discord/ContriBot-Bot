import { SlashCommand } from "@/types";

import {
  ActionRowBuilder,
  ButtonBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { userHelpEmbed, adminHelpEmbed, configHelpEmbed } from "@/embeds/help";

import { DB } from "..";

export const command: SlashCommand = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show the help menu.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select the type of help you want")
        .setRequired(false)
        .addChoices(
          { name: "User", value: "user" },
          { name: "Admin", value: "admin" },
          { name: "Config", value: "config" }
        )
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    const type = interaction.options.get("type")?.value as string;

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("Hprevious").setLabel("◀︎").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("Hnext").setLabel("▶").setStyle(1)
      );

    let embed = userHelpEmbed(guild.lang, guild.pointName);

    switch (type) {
      case "admin":
        embed = adminHelpEmbed(guild.lang, guild.pointName);
        break;
      case "config":
        button.components[1].setDisabled(true);
        embed = configHelpEmbed(guild.lang, guild.pointName);
        break;
      default:
        button.components[0].setDisabled(true);
        break;
    }

    interaction.reply({ embeds: [embed], components: [button] });
  },
};
