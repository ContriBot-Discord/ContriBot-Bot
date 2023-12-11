import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

import { DB } from "@/index";
import noItems from "@embeds/errors/shop/noItems";
import inventoryButtons from "@/builders/buttons/inventory";
import Inventory from "@embeds/inventory";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!DB.isReady) return;

        if (!interaction.isButton()) return;

        // If the button is not one of the buttons, we stop the function since it's not related to the shop
        if (
            !(
                interaction.customId.includes("INVprevious") ||
                interaction.customId.includes("INVnext") ||
                interaction.customId.includes("INVrefresh")
            )
        )
            return;

        // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
        await interaction.deferUpdate();

        // We get the actual page number. Used to know which items to display
        let actualPageInt: number = parseInt(
            interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
        );

        const guild = DB.getGuild(interaction.guildId!);
        const user = guild.getUser(interaction.user.id);

        // Copied list of the guild items
        let userItems = [...user.inventory];

        // If there are no items, send an error message
        if (userItems.length === 0) {
            await interaction.reply({
                embeds: [noItems(guild.lang)],
                ephemeral: true,
            });
            return;
        }

        // We get the list of items depending on the button pressed
        if (interaction.customId === "INVprevious") {
            actualPageInt -= 1;
        } else if (interaction.customId === "INVnext") {
            actualPageInt += 1;
        }

        // U is for user, A is for admin
        const pageButtons = inventoryButtons();

        // If the page is 1, we disable the "previous" button
        actualPageInt === 1
            ? pageButtons.components[0].setDisabled(true)
            : pageButtons.components[0].setDisabled(false);

        // If the page is the last one, we disable the "next" button
        actualPageInt === Math.ceil(userItems.length / 5)
            ? pageButtons.components[1].setDisabled(true)
            : pageButtons.components[1].setDisabled(false);

        // We now do generate the embed with all the data we got
        const embed = Inventory(
            actualPageInt,
            Math.ceil(userItems.length / 10),
            userItems,
            guild.lang,
            guild.pointName
        );


            await interaction.editReply({
                embeds: [embed],
                components: [pageButtons],
            });
    }
};

export default event;
