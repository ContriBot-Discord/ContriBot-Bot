import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, strings: number, ignored: number, total: number){
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: `<:orange_shop:1176931087298084874> Successful string addition`,
                value: `<:orange_line:1176931079979028530>`.repeat(10)
            },
            {
                name: " ",
                value: `Successfully added ${strings} strings to the item, for a total of ${total} strings.\n\n${ignored} strings were ignored because they were empty.`
            });
}