import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "../../../constants";
import { ColorResolvable } from "discord.js";

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
      name:
        getEmoji("orange_shield")!.value +
        i18next.t("embeds:default.title", { command_name: "admin remove" }),
      value: getEmoji("orange_line")!.value,
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
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
