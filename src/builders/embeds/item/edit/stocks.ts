import { getEmoji } from "@/constants";
import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, quantity: number, itemName: string){
    i18next.changeLanguage(lang);

    const strQuantity: string = (quantity == -1) ? 'embeds:item.edit.stock.infinite' : 'embeds:item.edit.stock.quantity';

    return new EmbedBuilder()
        .setColor("#F69255")
        .addFields({
                name: getEmoji("orange_shop") + i18next.t('embeds:item.edit.stock.title'),
                value: getEmoji("orange_line").repeat(9)
            },
            {
                name: " ",
                value: i18next.t(strQuantity, {quantity: quantity, itemName: itemName})
            });
}