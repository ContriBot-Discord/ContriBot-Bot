import { ShopItem } from "@/classes/ShopItem";
import { getEmoji } from "@/constants";
import i18next from "i18next";

export const getItemsField = function getItemsField(
  startingFrom: number,
  itemList: ShopItem[],
  lang: string,
  pointName: string
): { name: string; value: string }[] {
  i18next.changeLanguage(lang);

  const fields: { name: string; value: string }[] = [];

  startingFrom = (startingFrom - 1) * 5;

  for (let i: number = startingFrom; i < startingFrom + 5; i++) {
    const item = itemList[i];

    if (item) {
      let emoji: string;

      switch (item.action) {
        case 0:
          emoji = getEmoji("pink_at");
          break;
        case 1:
          emoji = getEmoji("pink_flask");
          break;
        case 2:
          emoji = getEmoji("pink_text");
          break;
        default:
          emoji = getEmoji("pink_object");
          break;
      }

      fields.push({
        name: ` `,
        value: `${emoji}**${item.label}** - ${item.price} ${pointName}\n> ${item.description}`,
      });
    }
  }

  return fields;
};
