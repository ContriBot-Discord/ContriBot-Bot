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

      fields.push({
        name: ` `,
        value: `${getItemEmoji(item.action)}**${item.label}** - ${item.price} ${pointName}\n> ${item.description}`,
      });
    }
  }

  return fields;
};


export const getItemEmoji = function getItemEmoji(action: number): string {
  switch (action) {
    case 0:
      return getEmoji("pink_at");
    case 1:
      return getEmoji("pink_flask");
    case 2:
      return getEmoji("pink_text");
    default:
      return getEmoji("pink_object");
  }
}