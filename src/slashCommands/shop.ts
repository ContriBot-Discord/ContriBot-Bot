import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@embeds/shop";
import { buyShopButtons, pageShopButtons } from "@/builders/buttons/shop";

export const command: SlashCommand = {
  name: "shop",
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Display the shop items"),

  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    // Copied list of the guild items
    let items = [...guild.shop];

    const embed = shopEmbed(
      1,
      Math.ceil(guild.shop.length / 5),
      items,
      guild.lang,
      guild.pointName
    );

    const buyButtons = buyShopButtons(1, items, interaction.guild?.roles.cache!);

    const pageButtons = pageShopButtons();

    // If there are less than 5 items, disable the "next" button
    if (guild.shop.length <= 5) pageButtons.components[1].setDisabled(true);
    pageButtons.components[0].setDisabled(true);

    await interaction.reply({
      embeds: [embed],
      components: [buyButtons, pageButtons],
    });
  },
};
