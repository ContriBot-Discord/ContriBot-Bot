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
                    "Sorry, this is not a valid stock !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: "The stock you tried to edit is not valid ! It must be a integer, with a minimum value of -1 (for unlimited)\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !"
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
