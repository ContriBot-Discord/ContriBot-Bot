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

  const title =
    "<:shiny_purple_star:1163585447201607781>" +
    i18next.t("embeds:shop.title", { index: index + 1 });

  const description = `<:lineviolett:1163753428317638696>`.repeat(8);

  const itemsText = items
    .map(
      (item) =>
        `**${item.label}** - ${item.price} ${pointName}\n${item.description}`
    )
    .join("\n");

  return new EmbedBuilder()
    .setDescription(`${title}\n${description}`)
    .addFields({
      name: "\u200b", // Empty field name
      value: itemsText,
    })
    .setColor("#aa54e1")
    .setTimestamp();
}
