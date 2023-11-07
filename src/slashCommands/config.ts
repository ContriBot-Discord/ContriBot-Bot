import {
  SlashCommandBuilder,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "..";
import configEmbed from "@/embeds/config";

export const command: SlashCommand = {

  name: "config",
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the bot."),
  async execute(interaction: CommandInteraction) {

    const guild = DB.getGuild(interaction.guildId!);


    const embed = configEmbed(
        guild.lang,
        "none",
        interaction.guild!.iconURL() as string,
        );


    await interaction.reply({ embeds: [embed] });
  },
};
