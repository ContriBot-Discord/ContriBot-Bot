import {EmbedBuilder} from "discord.js";

export default function getContribPoint(memberId: string, amount: number, scope: string) {

    return new EmbedBuilder()
        .addFields({
            name: " ",
            value: `**<:shinypurplestar:1163585447201607781> Get points command.**`,
        },
        {
            name: " ",
            value: `<:lineviolett:1163753428317638696>`.repeat(9),
        },
        {
            name: " ",
            value: scope == "both" ? `<@${memberId}> has **${amount}** leaderboard point(s).` : `<@${memberId}> has **${amount}** store point(s). `,
        })
        .setColor("#AA54E1")
        .setTimestamp();

}