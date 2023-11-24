import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, old_name: string, new_name: string){
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: `<:orange_shop:1176931087298084874> Successful item rename`,
                value: `<:orange_line:1176931079979028530>`.repeat(10)
            },
            {
                name: " ",
                value: `Successfully renamed ${old_name} to ${new_name} !`
            });
}