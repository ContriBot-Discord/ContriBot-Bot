import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export default function (
  action: string,
  point: number,
  pointName: string,
  lang: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`config:default.title`, { command_name: "config add" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: i18next.t(`config:actionpoint.description`, {
        action: action,
        point: point,
        pointName: pointName,
      }),
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
