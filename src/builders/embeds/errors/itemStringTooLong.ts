import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string, field_name: string, length: number, max_length: number): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    getEmoji("red_bug") +
                    "Waw, I can't read that much !",
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: `Sorry, the field \`${field_name}\` you tried to edit is too long (${length}/${max_length} max characters)!\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !`
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
