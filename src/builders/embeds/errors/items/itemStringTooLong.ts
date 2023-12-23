import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  field_name: string,
  length: number,
  max_length: number
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields(
      {
        name:
          getEmoji("red_bug") + i18next.t("errors:item.stringTooLong.title"),
        value: getEmoji("red_line"),
      },
      {
        name: " ",
        value:
          i18next.t("errors:item.stringTooLong.description", {
            field_name: field_name,
            length: length,
            max_length: max_length,
          }) +
          "\n\n" +
          i18next.t("errors:default.serverReport"),
      }
    )
    .setColor("#dd4040")
    .setTimestamp();
}
