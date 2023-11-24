import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  totalPages: number,
  index: number,
  itemFields: { name: string; value: string }[]
) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .setDescription(
      "<:shiny_purple_star:1163585447201607781>" +
        i18next.t("embeds:shop.title", { index: index + 1 }) +
        "\n" +
        "<:lineviolett:1163753428317638696>".repeat(8)
    )
    .addFields(itemFields)
    .setFooter({
      text: i18next.t("embeds:shop.footer.text", {
        pageNumber: index + 1,
        totalPages: totalPages,
      }),
    })
    .setColor("#aa54e1")
    .setTimestamp();
}
