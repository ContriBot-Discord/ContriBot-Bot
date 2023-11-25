import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    getEmoji("red_bug") +
                    "Whoops, I can't do that !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: "Sadly, I cannot perform that operation on that type of item. Make sure to have read the [documentation](https://docs.contribot.app)"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
