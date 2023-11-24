import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji} from "../../constants";
import { ColorResolvable } from "discord.js";

export default function (
  pageNumber: number,
  totalPages: number,
  userFields: { name: string; value: string }[],
  lang: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_leaderboard")!.value +
        i18next.t("embeds:leaderboard.title", { index: pageNumber }),
      value: getEmoji("pink_line")!.value,
    })
    .setFooter({
      text: i18next.t("embeds:leaderboard.footer.text", {
        pageNumber: pageNumber,
        totalPages: totalPages,
      }),
    })
    .addFields(userFields)
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
}
