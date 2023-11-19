import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export default function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`config:default.title`, { command_name: "config lang" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: i18next.t(`config:lang.description`),
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
}
