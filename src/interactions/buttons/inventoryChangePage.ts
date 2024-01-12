import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

import { DB } from "@/index";
import noItems from "@embeds/errors/shop/noItems";
import inventoryButtons from "@/builders/buttons/inventory";
import Inventory from "@embeds/inventory";
import adminInventoryButtons from "@/builders/buttons/interactInventory";

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


        const refunded = interaction.customId.split(" ")[1] === "true" // Fancy way to get the boolean value of the string
        const used = interaction.customId.split(" ")[2] === "true" // Also here

        const admin = interaction.customId.startsWith("a")

        // If the item is not refunded or used
        // Or if the item is refunded and the scope allows it
        // Or if the item is used and the scope allows it
        const items = user.inventory.filter(item => {
            if (!refunded && !used) return !(item.refunded || item.used);  // If we do not allow refunded & used in scope
            if (refunded && !used) return item.refunded;                // If we only allow refunded in scope
            if (!refunded && used) return item.used;                    // If we only allow used in scope
            return true;                                                // If we allow both in scope
        })

        // If there are no items, send an error message
        if (items.length === 0) {
            await interaction.editReply({
                embeds: [noItems(guild.lang)]
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
        const pageButtons = inventoryButtons(refunded, used);

        // If the page is 1, we disable the "previous" button
        actualPageInt === 1
            ? pageButtons.components[0].setDisabled(true)
            : pageButtons.components[0].setDisabled(false);

        // If the page is the last one, we disable the "next" button
        actualPageInt === Math.ceil(items.length / 5)
            ? pageButtons.components[1].setDisabled(true)
            : pageButtons.components[1].setDisabled(false);

        const buttons = [pageButtons]

        if (admin) {
            const refundButtons = adminInventoryButtons(actualPageInt, items, interaction.guild?.roles.cache!, refunded, used);
            buttons.push(refundButtons)
        }


        // We now do generate the embed with all the data we got
        const embed = Inventory(
            actualPageInt,
            Math.ceil(items.length / 10),
            items,
            guild.lang,
        );


            await interaction.editReply({
                embeds: [embed],
                components: buttons,
            });
    }
};

export default event;
