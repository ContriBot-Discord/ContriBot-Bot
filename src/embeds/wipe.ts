import {EmbedBuilder} from "discord.js";

export default function (scope: string = "both") {

    let value: string = `both of the users' points have been reset.`;
    if (scope === "leaderboardPoints") value = `users' leaderboard points have been reset.`;
    else if (scope === "storePoints") value = `users' store points have been reset.`;

    return new EmbedBuilder()
        .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> wipe all users points command.",
        value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10)
    })
        .addFields({
        name: " ",
        value: value,
    })
        .setColor("#ff8e4d")
        .setTimestamp();
}