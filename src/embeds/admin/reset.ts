import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "../../constants";
import { ColorResolvable } from "discord.js";

export default function (
  userId: string,
  scope: string = "both",
  lang: string,
  pointName: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  let value: string = `embeds:reset.description.both`;
  if (scope === "leaderboardPoints")
    value = `embeds:reset.description.leaderboardPoints`;
  else if (scope === "storePoints")
    value = `embeds:reset.description.storePoints`;

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_shield")!.value +
        i18next.t("embeds:default.title", { command_name: "admin reset" }),
      value: getEmoji("orange_line")!.value,
    })
    .addFields({
      name: " ",
      value: i18next.t(value, { userid: userId, pointName: pointName }),
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
