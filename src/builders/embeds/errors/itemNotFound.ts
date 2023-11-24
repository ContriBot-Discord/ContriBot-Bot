import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    "<:red_bug:1176930931139936336> " +
                    "Sorry, I can't find this item !",
                value: "<:red_line:1176930932838629489>".repeat(11),
            },
            {
                name: " ",
                value: "Sorry, I can't find this item !\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}