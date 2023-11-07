import {EmbedBuilder} from "discord.js";

export default function (amount: number, memberId: string, all:boolean) {
    return new EmbedBuilder()
        .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Remove points command.",
        value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10)
    })
        .addFields({
        name: " ",
        value: all ? `${amount} total contribution points has been removed from <@${memberId}>.` : `**${amount}** contribution points has been removed from <@${memberId}>. `,
    })
        .setColor("#ff8e4d")
        .setTimestamp();
}