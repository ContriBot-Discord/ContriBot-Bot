import {EmbedBuilder} from "discord.js";

export default function (all: boolean) {
    return new EmbedBuilder()
        .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> wipe all users points command.",
        value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10)
    })
        .addFields({
        name: " ",
        value: all ? `All of the users' leaderboard points have been reset.` : `All of the users' store points have been reset.`,
    })
        .setColor("#ff8e4d")
        .setTimestamp();
}