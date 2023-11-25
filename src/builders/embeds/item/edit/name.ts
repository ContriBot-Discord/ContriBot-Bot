import { getEmoji } from "@/constants";
import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, old_name: string, new_name: string){
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + `Successful item rename`,
                value: getEmoji("orange_line")
            },
            {
                name: " ",
                value: `Successfully renamed ${old_name} to ${new_name} !`
            });
}