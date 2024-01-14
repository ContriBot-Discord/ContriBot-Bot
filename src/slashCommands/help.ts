import { SlashCommand } from "@/types";

import {
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import {
  userHelpEmbed,
  adminHelpEmbed,
  configHelpEmbed,
  helpEmbed,
} from "@embeds/help";

import helpSelect from "@/builders/selects/help";

import { DB } from "@/index";
import helpButton from "@/builders/buttons/help";

export const command: SlashCommand = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show the help menu.")
    .setDMPermission(false)
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

    const button = helpButton();

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

    if (flag)
      interaction.reply({ embeds: [embed], components: [button, helpSelect()] });
    else interaction.reply({ embeds: [embed], components: [helpSelect()] });
  },
};
