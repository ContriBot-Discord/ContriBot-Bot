import {EmbedBuilder} from "discord.js";
import {getEmoji} from "@/constants";
import i18next from "i18next";

export default function (lang: string, itemId: string, itemName: number): EmbedBuilder {

    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + i18next.t("embeds:item.delete.title"),
                value: getEmoji("orange_line")
            },
            {
                name: " ",
                value: i18next.t("embeds:item.delete.success", {itemId: itemId, itemName: itemName})
            });

}