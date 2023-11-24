import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    "<:shiny_red_bug:1176622435899019355> " +
                    "Whoops, I can't do that !",
                value: "<:shiny_red_bar:1176625383211282483>".repeat(10),
            },
            {
                name: " ",
                value: "Sadly, I cannot perform that operation on that type of item. Make sure to have read the [documentation](https://docs.contribot.app)"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
