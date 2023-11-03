import {EmbedBuilder} from "discord.js";

export default function (pageNumber:number, totalPages:number, userFields: {name:string, value:string}[]) : EmbedBuilder {


    return new EmbedBuilder()
        .addFields({
                name: "<:shinypurplestar:1163585447201607781> Leaderboard",
                value: `<:lineviolett:1163753428317638696>`.repeat(6),
            })
        .setColor("#aa54e1")
        .setFooter({text: `Page ${pageNumber}/${totalPages}`})
        .setTimestamp()
        .addFields(userFields);
}