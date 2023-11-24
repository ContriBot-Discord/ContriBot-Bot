import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji} from "../../constants";
import { ColorResolvable } from "discord.js";

export default function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields(
      {
        name:
          getEmoji("blue_dev")!.value +
          i18next.t("embeds:whois.title"),
        value: getEmoji("blue_line")!.value,
      },
      {
        name: " ",
        value: i18next.t("embeds:whois.description"),
      }
    )
    .setColor(getColor("BLUE")!.hex as ColorResolvable)
    .setTimestamp();
}
