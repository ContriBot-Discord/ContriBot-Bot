import {EmbedBuilder} from "discord.js";

import i18n from "i18n";

export default function (lang:string) : EmbedBuilder {

    i18n.setLocale(lang);

    return new EmbedBuilder()
        .setTitle(i18n.__(`setLang.embed.setLang.title`))
        .setDescription(i18n.__(`setLang.embed.setLang.description`))
}