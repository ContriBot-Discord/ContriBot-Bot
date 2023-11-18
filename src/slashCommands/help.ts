import { SlashCommand } from "@/types";

import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";

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
    interaction.reply({ embeds: [embed] });
  },
};
