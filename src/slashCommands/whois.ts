import {
    SlashCommandBuilder,
    CommandInteraction,
    CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";

import whoisEmbed from "@embeds/whois";
import linkButtons from "@/builders/buttons/links";

import { DB } from "@/index";

export const command: SlashCommand = {
    name: "whois",
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Display informations about the developers of ContriBot")
        .setDMPermission(false),
    execute: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.reply({
            embeds: [
                whoisEmbed(DB.getGuild(interaction.guildId!).lang)
            ], components: [linkButtons()]
        });
    },
};
