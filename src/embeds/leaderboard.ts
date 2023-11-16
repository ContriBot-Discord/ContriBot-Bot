import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  pageNumber: number,
  totalPages: number,
  userFields: { name: string; value: string }[],
  lang: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        "<:shinypurplestar:1163585447201607781> " +
        i18next.t("embeds:leaderboard.title", { index: pageNumber }),
      value: `<:lineviolett:1163753428317638696>`.repeat(10),
    })
    .setFooter({
      text: i18next.t("embeds:leaderboard.footer.text", {
        pageNumber: pageNumber,
        totalPages: totalPages,
      }),
    })
    .addFields(userFields)
    .setColor("#aa54e1")
    .setTimestamp();
}
