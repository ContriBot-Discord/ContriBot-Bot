import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (ms: number, lang: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .setDescription(i18next.t("embeds:ping.description", { ping: ms }))
    .setColor("#ff8e4d");
}
