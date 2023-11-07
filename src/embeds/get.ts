import {EmbedBuilder} from "discord.js";

export default function getContribPoint(memberId: string, amount: number, all: boolean) {

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
            value: all ? `<@${memberId}> has **${amount}** total contribution point(s).` : `<@${memberId}> has **${amount}** contributution point(s). `,
        })
        .setColor("#AA54E1")
        .setTimestamp();

}