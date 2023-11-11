import {EmbedBuilder} from "discord.js";

export default function (userId:string, scope:string = "storePoints"): EmbedBuilder{

    let value: string = `both of the user's points have been reset.`;
    if (scope === "leaderboardPoints") value = `user's leaderboard points have been reset.`;
    else if (scope === "storePoints") value = `user's store points have been reset.`;

    return new EmbedBuilder()
        .addFields({
            name: "<:shiny_orange_moderator:1163759368853004298> Reset points command.",
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(9),
        })
        .setColor("#ff8e4d")
        .setTimestamp()
        .addFields({
            name: " ",
            value: value,
        })
}