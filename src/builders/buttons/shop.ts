import { ShopItem } from "@/classes/ShopItem";
import { getItemEmoji } from "@/tools/shopFunctions/embeds";
import { ActionRowBuilder, ButtonBuilder, Collection, Role } from "discord.js";

export const buyShopButtons = function (
  startingFrom: number,
  itemList: ShopItem[],
  roles: Collection<string, Role>
): ActionRowBuilder<ButtonBuilder> {
  startingFrom = (startingFrom - 1) * 5;

  const buttons = new ActionRowBuilder<ButtonBuilder>();

  for (let i: number = startingFrom; i < startingFrom + 5; i++) {
    const item = itemList[i];

    if (item) {
      const label: string =
        item.action == 0
          ? roles.get(item.label.match(/<@&(\d+)>/)![1])?.name!
          : item.label;

      buttons.addComponents(
        new ButtonBuilder()
          .setCustomId(`buy-${item.id}`)
          .setLabel(label)
          .setEmoji(getItemEmoji(item.action))
          .setStyle(3)
      );
    }
  }

  return buttons;
};

export const pageShopButtons = function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("Sprevious")
        .setLabel("◀︎")
        .setStyle(1)
        .setDisabled(true)
    )
    .addComponents(
      new ButtonBuilder().setCustomId("Snext").setLabel("▶").setStyle(1)
    );
};
