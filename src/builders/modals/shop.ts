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

export const boostEditModal = async function (
  interaction: ButtonInteraction<CacheType>,
  item: ShopItem
) {
  const modal = new ModalBuilder()
    .setCustomId("boostEditModal-" + item.id)
    .setTitle("Edit boost")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("boostEditDescription")
          .setLabel("Description")
          .setPlaceholder("Enter a description")
          .setStyle(TextInputStyle.Paragraph)
          .setValue(item.description)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("boostEditPrice")
          .setLabel("Price")
          .setPlaceholder("Enter a price")
          .setStyle(TextInputStyle.Short)
          .setValue(item.price.toString())
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("boostEditMultiplier")
          .setLabel("Multiplier (1.2 = 20% more)")
          .setPlaceholder("Enter a multiplier")
          .setStyle(TextInputStyle.Short)
          .setValue(
            item.multiplier !== null ? item.multiplier!.toString() : "1.0"
          )
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("boostEditDuration")
          .setLabel("Duration (hh:mm:ss)")
          .setPlaceholder("Enter a duration")
          .setStyle(TextInputStyle.Short)
          .setValue(
            item.boost_duration !== null
              ? item.boost_duration.toString()
              : "00:00:00"
          )
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("boostEditStocks")
          .setLabel("Stocks")
          .setPlaceholder("Enter a stock (leave -1 for unlimited)")
          .setStyle(TextInputStyle.Short)
          .setValue(item.max_quantity.toString())
          .setRequired(true)
      )
    );

  await interaction.showModal(modal);
};

export const textEditModal = async function (
  interaction: ButtonInteraction<CacheType>,
  item: ShopItem
) {
  const modal = new ModalBuilder()
    .setCustomId("textEditModal-" + item.id)
    .setTitle("Edit texts")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("textEditName")
          .setLabel("Name")
          .setPlaceholder("Enter a name")
          .setStyle(TextInputStyle.Short)
          .setValue(item.label)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("textEditDescription")
          .setLabel("Description")
          .setPlaceholder(
            "Warning: Once added, strings will never be displayed again for security reason"
          )
          .setStyle(TextInputStyle.Paragraph)
          .setValue(item.description)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("textEditPrice")
          .setLabel("Price")
          .setPlaceholder("Enter a price")
          .setStyle(TextInputStyle.Short)
          .setValue(item.price.toString())
          .setRequired(true)
      )
    );

  await interaction.showModal(modal);
};

export const customEditModal = async function (
  interaction: ButtonInteraction<CacheType>,
  item: ShopItem
) {
  const modal = new ModalBuilder()
    .setCustomId("customEditModal-" + item.id)
    .setTitle("Edit custom")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("customEditName")
          .setLabel("Name")
          .setPlaceholder("Enter a name")
          .setStyle(TextInputStyle.Short)
          .setValue(item.label)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("customEditDescription")
          .setLabel("Description")
          .setPlaceholder("Enter a description")
          .setStyle(TextInputStyle.Paragraph)
          .setValue(item.description)
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("customEditPrice")
          .setLabel("Price")
          .setPlaceholder("Enter a price")
          .setStyle(TextInputStyle.Short)
          .setValue(item.price.toString())
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("customEditStocks")
          .setLabel("Stocks")
          .setPlaceholder("Enter a stock (leave -1 for unlimited)")
          .setStyle(TextInputStyle.Short)
          .setValue(item.max_quantity.toString())
          .setRequired(true)
      )
    );

  await interaction.showModal(modal);
};
