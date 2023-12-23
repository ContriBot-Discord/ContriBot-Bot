import { ShopItem } from "@/classes/ShopItem";
import { getItemEmoji } from "@/tools/shopFunctions/embeds";
import { ActionRowBuilder, ButtonBuilder, Collection, Role } from "discord.js";

export default function (
  startingFrom: number,
  itemList: ShopItem[],
  roles: Collection<string, Role>,
  scope: string
): ActionRowBuilder<ButtonBuilder> {
  startingFrom = (startingFrom - 1) * 5;

  const buttons = new ActionRowBuilder<ButtonBuilder>();

  for (let i: number = startingFrom; i < startingFrom + 5; i++) {
    const item = itemList[i];

    let style: number;

    switch (scope) {
      case "buy":
        style = 3;
        break;
      case "edit":
        style = 2;
        break;
      default:
        style = 4;
        break;
    }

    if (item) {
      const name: RegExpMatchArray | null =  item.label.match(/<@&(\d+)>/)

      // If the item is a role, and the id is in the label
      const label : string = item.action == 0 && name
          ? roles.get(name[1])?.name || item.label
          : item.label;

      buttons.addComponents(
        new ButtonBuilder()
          .setCustomId(scope + `-${item.id}`)
          .setLabel(label)
          .setEmoji(getItemEmoji(item.action))
          .setStyle(style)
      );
    }
  }

  return buttons;
}
