import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji } from "@/constants";
import { ColorResolvable } from "discord.js";
import { getItemsField } from "@/tools/inventory"
import {UserItem} from "@/classes/UserItem";

export default function (
    pageNumber: number,
    totalPages: number,
    items: UserItem[],
    lang: string,
): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields({
            name:
                getEmoji("pink_leaderboard") +
                i18next.t("embeds:inventory.title", { index: pageNumber }),
            value: getEmoji("pink_line"),
        })
        .addFields(getItemsField(pageNumber, items, lang))
        .setFooter({
            text: i18next.t("embeds:inventory.footer", {
                pageNumber: pageNumber,
                totalPages: totalPages,
            }),
        })
        .setColor(getColor("PINK")!.hex as ColorResolvable)
        .setTimestamp();
}
