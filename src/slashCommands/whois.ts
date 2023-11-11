import {
    SlashCommandBuilder,
    CommandInteraction,
    CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";

import whoisEmbed from "@/embeds/whois";

import { DB } from "@/index";

export const command: SlashCommand = {
    name: "whois",
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Display informations about the developers of ContriBot"),
    execute: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.reply({
            embeds: [
                whoisEmbed(DB.getGuild(interaction.guildId!).lang)
            ],
        });
    },
};
