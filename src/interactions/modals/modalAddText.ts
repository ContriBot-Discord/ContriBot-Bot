import {BotEvent} from "@/types";
import {Events, Interaction} from "discord.js";
import {DB} from "@/index";
import Error from "@embeds/errors/items/itemNotFound";
import Sucess from "@embeds/items/text";


const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!DB.isReady) return;

        if (!interaction.isModalSubmit() || !interaction.customId.startsWith("textModal-") ) return;

        const guild = DB.getGuild(interaction.guildId!);

        // The customId is formatted like this: textModal-<item.id>
        // Splitting the custom ID will give us [textModal, <item.id>]

        const item = guild.getShopItem(parseInt(interaction.customId.split("-")[1]));

        if (item === null) {
            await interaction.reply({
                embeds: [Error(guild.lang)],
                ephemeral: true,
            });
        } else {
            let strings: string[] = interaction.fields.getTextInputValue("texts").split("\n"); // Get every line of the text input
            const count = strings.length;

            // Removing any empty string from the array
            strings = strings.filter((string) =>
                string.length !== 0  &&            // Checking if the string is empty
                !/^\s+$/.test(string)              // Using a regex to check if the string is empty/whitespace only
            );

            const itemTextCount = item.texts!.length; // Saved now due to the asynchronous nature of the function `item.addText()`

            item.addText(strings);


            await interaction.reply({
               embeds: [
                   Sucess(
                   guild.lang,
                   strings.length,
                   count - strings.length,
                   itemTextCount + strings.length
                   )
               ],
            });
        }

    },
};

export default event;
