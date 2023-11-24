import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string, field_name: string, length: number, max_length: number): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    "<:red_bug:1176930931139936336> " +
                    "Waw, I can't read that much !",
                value: "<:red_line:1176930932838629489>".repeat(11),
            },
            {
                name: " ",
                value: `Sorry, the field \`${field_name}\` you tried to add is too long (${length}/${max_length})!\n\nIf you think this is a bug, please report it on the [support server](https://discord.gg/pw88gWrY5d) !`
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
