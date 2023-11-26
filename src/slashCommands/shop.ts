import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@embeds/shop";
import { pageShopButtons } from "@/builders/buttons/shop";

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

    //const buyButton = new ActionRowBuilder<ButtonBuilder>()

        // if the item is a role, add the name of the role instead of id
        /*
        if (item.action == 0) {
          const roleId = item.label.match(/<@&(\d+)>/)![1];
          item.label = interaction.guild?.roles.cache.get(roleId)?.name!;
        }

        buyButton.addComponents(
          new ButtonBuilder()
            .setCustomId(`buy-${item.id}`)
            .setLabel(item.label)
            .setEmoji(emoji)
            .setStyle(3)
        );
        */

    const pageButtons = pageShopButtons();

    // If there are less than 5 items, disable the "next" button
    if (guild.shop.length <= 5) pageButtons.components[1].setDisabled(true);
    pageButtons.components[0].setDisabled(true);

    await interaction.reply({
      embeds: [embed],
      components: [pageButtons],
    });
  },
};
