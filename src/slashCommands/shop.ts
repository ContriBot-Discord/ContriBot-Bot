import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@/embeds/shop";

export const command: SlashCommand = {
  name: "shop",
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Display the shop items"),

  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);
    const items = guild.shop;

    const embed = shopEmbed(guild.lang, items.slice(0, 10), 0);

    await interaction.reply({ embeds: [embed] });
  },
};