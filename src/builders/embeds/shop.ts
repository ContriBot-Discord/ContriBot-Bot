import { ShopItem } from "@/classes/ShopItem";
import { getColor, getEmoji } from "@/constants";
import { ColorResolvable, EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getItemsField } from "@/tools/shopFunctions/embeds";

export default function (
  pageNumber: number,
  items: ShopItem[],
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_shop") +
        i18next.t("embeds:shop.title", { index: pageNumber }),
      value: getEmoji("pink_line"),
    })
    .addFields(getItemsField(pageNumber, items, lang, pointName))
    .setFooter({
      text: i18next.t("embeds:shop.footer.text", {
        pageNumber: pageNumber,
        totalPages: Math.ceil(items.length / 5),
      }),
    })
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
}
