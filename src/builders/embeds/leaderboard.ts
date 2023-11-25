import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji} from "../../constants";
import { ColorResolvable } from "discord.js";
import { User } from "@/classes/User";
import { getUsersField } from "@/tools/leaderboard";

export default function (
  pageNumber: number,
  totalPages: number,
  users: User[],
  lang: string,
  pointName: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_leaderboard") +
        i18next.t("embeds:leaderboard.title", { index: pageNumber }),
      value: getEmoji("pink_line"),
    })
    .setFooter({
      text: i18next.t("embeds:leaderboard.footer.text", {
        pageNumber: pageNumber,
        totalPages: totalPages,
      }),
    })
    .addFields(getUsersField(pageNumber, users, lang, pointName))
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
}
