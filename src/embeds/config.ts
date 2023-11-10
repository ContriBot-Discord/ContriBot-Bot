import {EmbedBuilder} from "discord.js";
import i18next from "i18next";

export default function (lang: string, anniversaryRole: string, iconURL: string) {
    // TODO: Obtain the real values

    return new EmbedBuilder()
        .addFields({
            name: `<:shiny_orange_moderator:1163759368853004298>` + i18next.t("embeds:config.title"),
            value: `<:shiny_orange_bar:1163759934702374942>`.repeat(4)
        })
        .addFields({
            name: i18next.t("embeds:config.description"),
            value: ` `,
        })
        .addFields({
            name: `<:shinypurplestar:1163585447201607781>` + i18next.t('embeds:config.pointsCfg.name'),
            value: i18next.t("embeds:config.pointsCfg.value", {
                message: 1,
                react: 1,
                voice: 1,
                bump: 1
            }),
            inline: true,
        })
        .addFields({
            name: `<:shinybluelink:1163501771415625820>` + i18next.t("embeds:config.other.name"),
            value: i18next.t("embeds:config.other.value", {
                birthdayrole: "12345678923456789",
                lang: lang
            }),
            inline: true,
        })
        .setThumbnail(iconURL)
        .setColor("#ff8e4d")
        .setTimestamp();
}