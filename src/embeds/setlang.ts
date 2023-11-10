import {EmbedBuilder} from "discord.js";

import i18next from "i18next";

export default function (lang:string) : EmbedBuilder {

    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .setTitle(i18next.t(`embeds:lang.title`))
        .setDescription(i18next.t(`embeds:lang.description`))
}