import { getEmoji } from "@/constants";
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
      getEmoji("pink_shop") +
        i18next.t("embeds:shop.title", { index: index + 1 }) +
        "\n" +
        getEmoji("pink_line")
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
