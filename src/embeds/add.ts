import {EmbedBuilder} from "discord.js";

import i18n from "i18n";

export default function (userId: string, amount: number, memberId: string, lang: string, scope:string = "storePoints") {

    i18n.setLocale(lang);
    return new EmbedBuilder()
        .addFields({
            name: "<:shiny_orange_moderator:1163759368853004298> Add points command.",
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(9,)
        })
        .addFields({
            name: " ",
            value: i18n.__(scope === "leaderboard" ? `embeds:addContribPoint.embed.description` : '<@%s> added %s to <@%s>\' globals points.',
                userId,
                i18n.__n(`global.points`, amount),
                memberId),
        })
        .setColor("#ff8e4d")
        .setTimestamp();
}