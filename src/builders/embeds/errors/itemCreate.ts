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
                    "Whoops, I just caught a bug !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: "An error occurred.\n\nPlease, remember that the `label` field has to be less than 30 characters long and the `description` field has to be less than 150 characters long !\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
