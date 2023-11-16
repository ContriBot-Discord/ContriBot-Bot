import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  userId: string,
  amount: number,
  memberId: string,
  scope: string = "both",
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  let translation = "embeds:remove.description.both";
  if (scope === "leaderboardPoints")
    translation = "embeds:remove.description.leaderboardPoints";
  else if (scope === "storePoints")
    translation = "embeds:remove.description.storePoints";

  return new EmbedBuilder()
    .addFields({
      name: "<:shiny_orange_moderator:1163759368853004298> Remove points command.",
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
    })
    .addFields({
      name: " ",
      value: i18next.t(translation, {
        userid: userId,
        quantity: amount,
        memberid: memberId,
        pointName: pointName,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
