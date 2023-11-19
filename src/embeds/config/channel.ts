import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export default function (
  channelId: string,
  pointName: string,
  value: string,
  lang: string
) {
  i18next.changeLanguage(lang);

  const description: string =
    value === "enable"
      ? i18next.t("config:channel.description.enable", {
          channelId: channelId,
          pointName: pointName,
        })
      : i18next.t("config:channel.description.disable", {
          channelId: channelId,
          pointName: pointName,
        });

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t("config:default.title", {
          command_name: "config channel",
        }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: description,
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
