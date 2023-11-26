import { getEmoji } from "@/constants";
import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, itemName :string, price: number, pointname: string){
    i18next.changeLanguage(lang);
    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + i18next.t("embeds:item.edit.price.title"),
                value: getEmoji("orange_line").repeat(9)
            },
            {
                name: " ",
                value: i18next.t("embeds:item.edit.price.description", {itemName: itemName, price: price, pointName: pointname})
            });
}