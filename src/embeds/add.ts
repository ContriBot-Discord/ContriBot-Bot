import { EmbedBuilder } from "discord.js";

import i18n from "i18next";

export default function (
  userId: string,
  amount: number,
  memberId: string,
  lang: string,
  scope: string = "both"
) {
  i18n.changeLanguage(lang);

  let fieldName: string;

  switch (scope) {
    case "storePoints":
      fieldName = "embeds:add.description.storePoints";
      break;
    case "leaderboardPoints":
      fieldName = "embeds:add.description.leaderboardPoints";
      break;
    default:
      fieldName = "embeds:add.description.both";
      break;
  }

  return new EmbedBuilder()
    .addFields({
      name: `<:shiny_orange_moderator:1163759368853004298> ${i18n.t(
        "embeds:default.title",
        { command_name: "add" }
      )}`,
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
    })
    .addFields({
      name: " ",
      value: i18n.t(fieldName, {
        userid: userId,
        quantity: amount,
        pointsname: "points",
        memberid: memberId,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
