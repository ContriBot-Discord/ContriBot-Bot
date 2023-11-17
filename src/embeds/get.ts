import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function(
  memberId: string,
  amount: number,
  scope: string = "storePoints",
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  const translation =
    scope === "storePoints"
      ? "embeds:get.description.storePoints"
      : "embeds:get.description.leaderboardPoints";

  return new EmbedBuilder()
    .addFields(
      {
        name: " ",
        value:
          `<:shinypurplestar:1163585447201607781>` +
          i18next.t("embeds:default.title", { command_name: "get" }),
      },
      {
        name: " ",
        value: `<:lineviolett:1163753428317638696>`.repeat(8),
      },
      {
        name: " ",
        value: i18next.t(translation, { userid: memberId, amount: amount, pointName: pointName}),
      }
    )
    .setColor("#AA54E1")
    .setTimestamp();
}
