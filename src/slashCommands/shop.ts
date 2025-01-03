import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@embeds/shop";
import interactShopButtons from "@/builders/buttons/interactShop";
import pageShopButtons from "@/builders/buttons/pageShop";
import noItems from "@embeds/errors/shop/noItems";

export const command: SlashCommand = {
  name: "shop",
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Display the shop items")
    .setDMPermission(false),

  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    // Copied list of the guild items
    let items = [...guild.getShopItems()];

    // Remove items with a max_quantity of 0 (= out of stock)
    // Not using > 0 because it would also remove items with a max_quantity of -1 (= unlimited)
    items = items.filter((item) => item.max_quantity != 0);

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
      items,
      guild.lang,
      guild.pointName
    );

    const pageButtons = pageShopButtons("shop");

    // If there are less than 5 items, disable the "next" button
    if (items.length <= 5) pageButtons.components[1].setDisabled(true);
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
