import { ShopItem } from "@/classes/ShopItem";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  pointName: string,
  items: ShopItem[],
  index: number
) {
  i18next.changeLanguage(lang);

  const fields = items.map((item) => {
    return {
      name: item.name + " - " + item.price + " " + pointName,
      value: item.description,
    };
  });

  return new EmbedBuilder()
    .addFields({
      name:
        "<:shiny_purple_star:1163585447201607781>" +
        i18next.t("embeds:shop.title", { index: index + 1 }),
      value: `<:lineviolett:1163753428317638696>`.repeat(8),
    })
    .addFields(fields)
    .setColor("#aa54e1")
    .setTimestamp();
}
