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
                    "Sorry, I can't find this item !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: "Sorry, I can't find this item !\n\nIf you believe this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
