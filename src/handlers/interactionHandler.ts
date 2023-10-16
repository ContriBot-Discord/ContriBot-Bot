import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";

module.exports = (client: Client) => {
    let interactionsDir = join(__dirname, "../interactions")

    readdirSync(interactionsDir).forEach(file => {
        if (!file.endsWith(".js")) return;

        const interaction: BotEvent = require(`${interactionsDir}/${file}`).default;

        interaction.once 
        ? client.once(interaction.name, (...args) => interaction.execute(...args)) 
        : client.on(interaction.name, (...args) => interaction.execute(...args));

        console.log(`🌠 Successfully loaded interaction ${file}`);
    })
}