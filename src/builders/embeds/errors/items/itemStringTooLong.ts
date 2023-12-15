import { getEmoji } from "@/constants";
import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (lang: string, field_name: string, length: number, max_length: number): EmbedBuilder {
    i18next.changeLanguage(lang);

    return new EmbedBuilder()
        .addFields(
            {
                name:
                    getEmoji("red_bug") +
                    i18next.t("errors:item.fieldsTooLong.title"),
                value: getEmoji("red_line"),
            },
            {
                name: " ",
                value: i18next.t("errors:item.fieldsTooLong.description", {field_name: field_name, length: length, max_length: max_length})
            }
        )
        .setColor("#dd4040")
        .setTimestamp();
}
