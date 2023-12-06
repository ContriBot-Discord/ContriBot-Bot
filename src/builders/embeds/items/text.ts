import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  strings: number,
  ignored: number,
  total: number
) {
  i18next.changeLanguage(lang);

  const ingored =
    ignored > 0
      ? i18next.t("embeds:item.text.ignored", { ignored: ignored })
      : "";

  return new EmbedBuilder().setColor("#F69255").addFields(
    {
      name: getEmoji("orange_shop") + i18next.t("commands.item.text.title"),
      value: getEmoji("orange_line"),
    },
    {
      name: " ",
      value:
        i18next.t("embeds:item.text.description", {
          strings: strings,
          total: total,
        }) + ingored,
    }
  );
}
