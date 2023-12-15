import { getColor, getEmoji } from "@/constants";
import { ColorResolvable, EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  userId: string,
  itemName: string,
  itemPrice: number,
  pointName: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_shop") +
        i18next.t(`logs:default.title`, { log_name: "Shop" }),
      value: getEmoji("orange_line"),
    })
    .addFields({
      name: " ",
      value: i18next.t(`logs:shop.buy`, {
        userId: userId,
        itemName: itemName,
        itemPrice: itemPrice,
        pointName: pointName,
      }),
    })
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
}
