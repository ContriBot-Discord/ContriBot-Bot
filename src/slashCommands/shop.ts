import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@/builders/embeds/shop";
import interactShopButtons from "@/builders/buttons/interactShop";
import pageShopButtons from "@/builders/buttons/pageShop";
import noItems from "@/builders/embeds/errors/shop/noItems";

export const command: SlashCommand = {
  name: "shop",
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Display the shop items"),

  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    // Copied list of the guild items
    let items = [...guild.getShopItems()];

    // If there are no items, send an error message
    if (items.length === 0) {
      await interaction.reply({
        embeds: [noItems(guild.lang)],
        ephemeral: true,
      });
      return;
    }

    const embed = shopEmbed(
      1,
      Math.ceil(guild.shop.length / 5),
      items,
      guild.lang,
      guild.pointName
    );

    const pageButtons = pageShopButtons("shop");

    // If there are less than 5 items, disable the "next" button
    if (guild.shop.length <= 5) pageButtons.components[1].setDisabled(true);
    pageButtons.components[0].setDisabled(true);

    await interaction.reply({
      embeds: [embed],
      components: [
        interactShopButtons(1, items, interaction.guild?.roles.cache!, "buy"),
        pageButtons,
      ],
    });
  },
};
