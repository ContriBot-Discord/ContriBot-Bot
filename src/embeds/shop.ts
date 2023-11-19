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

  const fields = items.map((item) => ({
    name: " ",
    value: `**${item.label}** - ${item.price} ${pointName}\n${item.description}`,
  }));

  return new EmbedBuilder()
    .setDescription(
      "<:shiny_purple_star:1163585447201607781>" +
        i18next.t("embeds:shop.title", { index: index + 1 }) +
        "\n" +
        "<:lineviolett:1163753428317638696>".repeat(8)
    )
    .addFields(fields)
    .setColor("#aa54e1")
    .setTimestamp();
}
