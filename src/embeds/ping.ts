import {EmbedBuilder} from "discord.js";

export default function (ping: number) {
    return new EmbedBuilder()
        .setDescription(`🏓 Pong! \n 📡 Ping: ${ping}`)
        .setColor("#ff8e4d")
}