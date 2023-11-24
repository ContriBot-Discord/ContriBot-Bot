import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji} from "../../../constants";
import { ColorResolvable } from "discord.js";

export default function (
  channelId: string,
  pointName: string,
  value: string,
  lang: string
) {
  i18next.changeLanguage(lang);

  const description: string =
    value === "enable"
      ? i18next.t("config:channel.description.enable", {
          channelId: channelId,
          pointName: pointName,
        })
      : i18next.t("config:channel.description.disable", {
          channelId: channelId,
          pointName: pointName,
        });

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_hammer")!.value +
        i18next.t("config:default.title", {
          command_name: "config channel",
        }),
      value: getEmoji("orange_line")!.value,
    })
    .addFields({
      name: description,
      value: ` `,
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
