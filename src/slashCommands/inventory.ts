import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

import inventoryEmbed from "@embeds/inventory";
import inventoryButtons from "@/builders/buttons/inventory";

export const command: SlashCommand = {
    name: "inventory",
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Show your super-cosy inventory"),

    async execute(interaction: CommandInteraction) {
        const guild = DB.getGuild(interaction.guildId!);

        const user = guild.getUser(interaction.user.id);

        // Generate the embed
        const embed = inventoryEmbed(
            1,
            Math.ceil(user.inventory.length / 10),
            user.inventory,
            guild.lang,
            guild.pointName
        );

        const button: ActionRowBuilder<ButtonBuilder> = inventoryButtons();

        // If there are less than 10 users, disable the "next" button
        button.components[0].setDisabled(true);
        if (guild.users.length <= 10) button.components[1].setDisabled(true);

        await interaction.reply({ embeds: [embed], components: [button] });
    },
};