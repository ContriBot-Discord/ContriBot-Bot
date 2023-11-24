import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji} from "../../../constants";
import { ColorResolvable } from "discord.js";

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
        getEmoji("orange_hammer")!.value +
        i18next.t(`config:default.title`, { command_name: "config add" }),
      value: getEmoji("orange_line")!.value,
    })
    .addFields({
      name: i18next.t(`config:actionpoint.description`, {
        action: action,
        point: point,
        pointName: pointName,
      }),
      value: ` `,
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
