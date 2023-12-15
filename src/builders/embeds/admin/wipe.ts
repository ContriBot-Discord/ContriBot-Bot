import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "@/constants";
import { ColorResolvable } from "discord.js";

export default function (
  scope: string = "both",
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  let value: string = `embeds:wipe.description.both`;
  if (scope === "leaderboardPoints")
    value = `embeds:wipe.description.leaderboardPoints`;
  else if (scope === "storePoints")
    value = `embeds:wipe.description.storePoints`;

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_shield") +
        i18next.t("embeds:default.title", { command_name: "admin wipe" }),
      value: getEmoji("orange_line"),
    })
    .addFields({
      name: " ",
      value: i18next.t(value, { pointName: pointName }),
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
