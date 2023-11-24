import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "../../../constants";
import { ColorResolvable } from "discord.js";

export default function (pointName: string, lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_hammer")!.value +
        i18next.t(`config:default.title`, { command_name: "config pointname" }),
      value: getEmoji("orange_line")!.value,
    })
    .addFields({
      name: i18next.t(`config:pointname.description`, { pointName: pointName }),
      value: ` `,
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
