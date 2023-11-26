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
                    "Sorry, I can't accept that !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: "Even if it is very nice of you, I can't accept negative prices !\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
