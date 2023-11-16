import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

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
        "<:shiny_orange_moderator:1163759368853004298>" +
        i18next.t("embeds:default.title", { command_name: "wipe" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(value, { pointName: pointName }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
