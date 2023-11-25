import {EmbedBuilder} from "discord.js";
import {getEmoji} from "@/constants";
import i18next from "i18next";

export default function (lang: string, itemId: string, itemName: number): EmbedBuilder {

    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + `Successful item delete`,
                value: getEmoji("orange_line")
            },
            {
                name: " ",
                value: `Successfully deleted ${itemName} (id: \`${itemId}\`). Hopefully, it was recyclable !`
            });

}