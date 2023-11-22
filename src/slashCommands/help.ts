import { SlashCommand } from "@/types";

import {
  ActionRowBuilder,
  ButtonBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

import {
  userHelpEmbed,
  adminHelpEmbed,
  configHelpEmbed,
  helpEmbed,
} from "@/embeds/help";

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

    const select = new StringSelectMenuBuilder()
      .setCustomId("Hselect")
      .setPlaceholder("Select the type of help you want")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("User")
          .setDescription("Show the user help menu.")
          .setValue("user"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Admin")
          .setDescription("Show the admin help menu.")
          .setValue("admin"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Config")
          .setDescription("Show the config help menu.")
          .setValue("config"),
      ]);

    const row = new ActionRowBuilder().addComponents(select);

    let embed = helpEmbed(guild.lang);

    let flag: boolean = true;

    switch (type) {
      case "admin":
        embed = adminHelpEmbed(guild.lang, guild.pointName);
        break;
      case "config":
        button.components[1].setDisabled(true);
        embed = configHelpEmbed(guild.lang, guild.pointName);
        break;
      case "user":
        button.components[0].setDisabled(true);
        embed = userHelpEmbed(guild.lang, guild.pointName);
        break;
      default:
        flag = false;
        break;
    }

    if (flag) interaction.reply({ embeds: [embed], components: [button, row as any] });
    else interaction.reply({ embeds: [embed], components: [row as any] });
  },
};
