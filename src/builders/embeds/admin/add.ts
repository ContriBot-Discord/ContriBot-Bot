import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "@/constants";
import { ColorResolvable } from "discord.js";

export default function (
  userId: string,
  amount: number,
  memberId: string,
  lang: string,
  scope: string = "both",
  pointName: string
) {
  i18next.changeLanguage(lang);

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
      name:
        getEmoji("orange_shield") +
        i18next.t("embeds:default.title", { command_name: "admin add" }),
      value: getEmoji("orange_line"),
    })
    .addFields({
      name: " ",
      value: i18next.t(fieldName, {
        userid: userId,
        quantity: amount,
        pointsname: "points",
        memberid: memberId,
        pointName: pointName,
      }),
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
