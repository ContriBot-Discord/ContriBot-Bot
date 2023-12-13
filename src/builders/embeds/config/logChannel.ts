import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "@/constants";
import { ColorResolvable } from "discord.js";

export default function (channelId: string, lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_hammer") +
        i18next.t(`config:default.title`, {
          command_name: "config logchannel",
        }),
      value: getEmoji("orange_line"),
    })
    .addFields({
      name: i18next.t(`config:logchannel.description`, {
        channelId: channelId,
      }),
      value: ` `,
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
