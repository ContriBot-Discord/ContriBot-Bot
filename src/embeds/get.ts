import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function getContribPoint(memberId: string, amount: number, scope: string = "storePoints", lang: string) {

    i18next.changeLanguage(lang)

    const translation = (scope === "storePoints") ?
        "embeds:getContribPoint.description.storePoints" : "embeds:getContribPoint.description.leaderboardPoints"

    return new EmbedBuilder()
        .addFields({
            name: " ",
            value: `<:shinypurplestar:1163585447201607781>` + i18next.t("embeds:default.title", {command_name: "get"}),
        },
        {
            name: " ",
            value: `<:lineviolett:1163753428317638696>`.repeat(9),
        },
        {
            name: " ",
            value: i18next.t(translation, {userid: memberId, amount: amount}),
        })
        .setColor("#AA54E1")
        .setTimestamp();

}