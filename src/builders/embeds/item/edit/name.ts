import { getEmoji } from "@/constants";
import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, old_name: string, new_name: string){
    i18next.changeLanguage(lang);
    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + i18next.t('embeds:item.edit.name.title'),
                value: getEmoji("orange_line")
            },
            {
                name: " ",
                value: i18next.t('embeds:item.edit.name.description', {oldName: old_name, newName: new_name})
            });
}