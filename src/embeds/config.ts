import {EmbedBuilder} from "discord.js";

export default function (lang: string, anniversaryRole: string, iconURL: string) {

    return new EmbedBuilder()
        .addFields({
            name: "<:shiny_orange_moderator:1163759368853004298> Config",
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(4)
        })
        .addFields({
            name: "Here is your server's configuration:",
            value: ` `,
        })
        .addFields({
            name: `<:shinypurplestar:1163585447201607781> Way to earn points.       ‎ `,
            value: `Send message: **1**
                React message: **25**
                Voice channel: **50**
                Disboard bump: **100**`,
            inline: true,
        })
        .addFields({
            name: `<:shinybluelink:1163501771415625820> Others.`,
            value: `Birthday rôle <@${anniversaryRole}>
            Server language: ${lang}`,
            inline: true,
        })
        .setThumbnail(iconURL)
        .setColor("#ff8e4d")
        .setTimestamp();
}