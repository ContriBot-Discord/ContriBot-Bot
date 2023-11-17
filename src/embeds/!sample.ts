import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (title: string, lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder().setTitle(title);
}
