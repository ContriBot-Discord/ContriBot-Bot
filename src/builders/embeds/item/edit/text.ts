import { getEmoji } from "@/constants";
import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, strings: number, ignored: number, total: number){
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + `Successful string addition`,
                value: getEmoji("orange_line")
            },
            {
                name: " ",
                value: `Successfully added ${strings} strings to the item, for a total of ${total} strings.\n\n${ignored} strings were ignored because they were empty.`
            });
}