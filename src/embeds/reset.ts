import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (userId:string, scope:string = "storePoints", lang:string): EmbedBuilder{

    i18next.changeLanguage(lang)

    let value: string = `embeds:reset.description.both`;
    if (scope === "leaderboardPoints") value = `embeds:reset.description.leaderboardPoints`;
    else if (scope === "storePoints") value = `embeds:reset.description.storePoints`;

    return new EmbedBuilder()
        .addFields({
            name: "<:shiny_orange_moderator:1163759368853004298>" + i18next.t("embeds:default.title", {command_name:"reset"}),
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(9),
        })
        .setColor("#ff8e4d")
        .setTimestamp()
        .addFields({
            name: " ",
            value: value,
        })
}