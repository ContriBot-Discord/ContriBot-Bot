import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields(
      {
        name:
          "<:shinypurpledev:1172885854616834119> " +
          i18next.t("embeds:whois.title"),
        value: "<:lineviolett:1163753428317638696>".repeat(8),
      },
      {
        name: " ",
        value: i18next.t("embeds:whois.description"),
      }
    )
    .setColor("#ab54e1")
    .setTimestamp();
}
