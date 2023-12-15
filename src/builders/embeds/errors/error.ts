import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

// WIP
export default function (lang: string, errorCode: string | null): EmbedBuilder {
    i18next.changeLanguage(lang);

    errorCode = errorCode ? errorCode : "None provided";

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
                value: `A fatal error occurred.\n\nWe are sorry you had to see this. Please, join our [support server](https://discord.gg/pw88gWrY5d) so we can fix this bug with you over a glass of milk and some cookies !\n\nError code: \`${errorCode}\`.`
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
