import {ShopItem} from "@/classes/ShopItem";
import {EmbedBuilder} from "discord.js";

export default function (lang: string, items: ShopItem[], index: number){

    const fields = items.map((item) => {

        return {
            name: item.name + " - " + item.price + " points",
            value: item.description,
        }

    });

    return new EmbedBuilder()
        .addFields({
            name: `<:shiny_orange_moderator:1163759368853004298>Shop - ${index + 1}`,
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
        })
        .addFields(fields)

}