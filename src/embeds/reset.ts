import {EmbedBuilder} from "discord.js";

export default function (userId:string, scope:string): EmbedBuilder{

        return new EmbedBuilder()
            .addFields({
                name: "<:shiny_orange_moderator:1163759368853004298> Reset points command.",
                value: `<:shiny_orange_bar:1163759934702374942>`.repeat(9),
            })
            .setColor("#ff8e4d")
            .setTimestamp()
            .addFields({
                name: " ",
                value: scope == "both" ? `All of <@${userId}>'s leaderboard points have been reset.` : `All of <@${userId}>'s store points have been reset.`,
            })
}