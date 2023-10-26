import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  Guild,
} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "..";

export const command: SlashCommand = {
  name: "config",
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the bot."),
  async execute(interaction: CommandInteraction<CacheType>) {
    const lineString: string = `<:shiny_orange_bar:1163759934702374942>`.repeat(
      4
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Config",
        value: lineString,
      })
      .addFields({
        name: "Here is your server's configuration:",
        value: ` `,
      })
      .addFields({
        name: `<:shinypurplestar:1163585447201607781> Way to earn points.       ‎ `,
        value: `Send message: **1**
                React message: **25**
                Voice channel: **50**
                Disboard bump: **100**`,
        inline: true,
      })
      .addFields({
        name: `<:shinybluelink:1163501771415625820> Others.`,
        value: `Birthday rôle <@{anniversaryRole}>
        Server language: ${DB.getGuild(interaction.guildId!).lang}`,
        inline: true,
      })
      .setThumbnail(interaction.guild?.iconURL() as string)
      .setColor("#ff8e4d")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
