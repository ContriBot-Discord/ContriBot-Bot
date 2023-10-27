import {EmbedBuilder} from "discord.js";

export function sample (title: string) : EmbedBuilder {

    const embed = new EmbedBuilder()
        .setTitle(title)



    return embed;
}