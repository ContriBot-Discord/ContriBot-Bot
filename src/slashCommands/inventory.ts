import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

import inventoryEmbed from "@embeds/inventory";
import inventoryButtons from "@/builders/buttons/inventory";

export const command: SlashCommand = {
    name: "inventory",
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Show your super-cosy inventory")
        .addBooleanOption((option) =>
            option
                .setName("refunded")
                .setDescription("Show refunded items")
                .setRequired(false)
        )
        .addBooleanOption((option) =>
            option
                .setName("used")
                .setDescription("Show used items")
                .setRequired(false)
        ),

    async execute(interaction: CommandInteraction) {
        const guild = DB.getGuild(interaction.guildId!);

        const user = guild.getUser(interaction.user.id);

        // Get the values of the options

        // @ts-ignore
        const refunded = interaction.options.getBoolean("refunded");
        // @ts-ignore
        const used = interaction.options.getBoolean("used");

        // If the item is not refunded or used
        // Or if the item is refunded and the scope allows it
        // Or if the item is used and the scope allows it
        const items = user.inventory.filter(item => {
            if (!refunded && !used) return !(item.refunded || item.used);  // If we do not allow refunded & used in scope
            if (refunded && !used) return item.refunded;                // If we only allow refunded in scope
            if (!refunded && used) return item.used;                    // If we only allow used in scope
            return true;                                                // If we allow both in scope
        })


        // Generate the embed
        const embed = inventoryEmbed(
            1,
            Math.ceil(items.length / 10),
            items,
            guild.lang,
        );

        const button: ActionRowBuilder<ButtonBuilder> = inventoryButtons(
            refunded,
            used
        );

        // If there are less than 10 users, disable the "next" button
        button.components[0].setDisabled(true);
        if (guild.users.length <= 10) button.components[1].setDisabled(true);

        await interaction.reply({ embeds: [embed], components: [button] });
    },
};