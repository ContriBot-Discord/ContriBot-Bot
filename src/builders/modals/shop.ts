import { ShopItem } from "@/classes/ShopItem";
import {
  ActionRowBuilder,
  ButtonInteraction,
  CacheType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const roleEditModal = async function (
  interaction: ButtonInteraction<CacheType>,
  item: ShopItem
) {
  const modal = new ModalBuilder()
    .setCustomId("roleEditModal-" + item.id)
    .setTitle("Edit role")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("roleEditRole")
          .setLabel("Role")
          .setPlaceholder("Enter a role id")
          .setStyle(TextInputStyle.Short)
          .setValue(item.label.match(/<@&(\d+)>/)![1])
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("roleEditDescription")
          .setLabel("Description")
          .setPlaceholder("Enter a description")
          .setStyle(TextInputStyle.Paragraph)
          .setValue(item.description)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("roleEditPrice")
          .setLabel("Price")
          .setPlaceholder("Enter a price")
          .setStyle(TextInputStyle.Short)
          .setValue(item.price.toString())
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("roleEditStocks")
          .setLabel("Stocks")
          .setPlaceholder("Enter a stock (leave -1 for unlimited)")
          .setStyle(TextInputStyle.Short)
          .setValue(item.max_quantity.toString())
          .setRequired(true)
      )
    );

  await interaction.showModal(modal);
};
