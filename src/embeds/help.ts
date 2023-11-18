import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export default function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_purple_bughunter:1174454832275390504>` +
        i18next.t(`embeds:default.title`, { command_name: "help" }),
      value: `<:shiny_purple_bar:1163753428317638696>`.repeat(8),
    })
    .addFields({
      name: ` `,
      value: i18next.t(`embeds:help.description`, { pointName: pointName }),
    })
    .setColor("#aa54e1")
    .setTimestamp();
}
