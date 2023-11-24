import {
    ActionRowBuilder,
    CommandInteraction,
    CommandInteractionOptionResolver,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";

import {DB} from "@/index";
import {ShopItem} from "@/classes/ShopItem";
import notFound from "@/builders/embeds/errors/itemNotFound";
import incompatible from "@/builders/embeds/errors/itemIncompatible"

async function showTextModal(interaction: CommandInteraction, item: ShopItem) {


    const texts = new TextInputBuilder()
        .setCustomId('texts')
        .setLabel("Please, add one string per line.")
        .setPlaceholder("Warning: Once added, strings will never be displayed again for security reason")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const modal = new ModalBuilder()
        .setCustomId('textModal-' + item.id)
        .setTitle('Add new strings');


    // That f*cking `as` statement is required because DJS wasn't meant to be smart
    const ActionRow = new ActionRowBuilder().addComponents(texts) as ActionRowBuilder<TextInputBuilder>;

    modal.addComponents(ActionRow);

    await interaction.showModal(modal);

}

export const edit = async function edit(
    interaction: CommandInteraction<import("discord.js").CacheType>
) {


    const guild = DB.getGuild(interaction.guildId!);

    let subcommand: CommandInteractionOptionResolver | string =
        interaction.options as CommandInteractionOptionResolver;


    switch (subcommand.getSubcommand()){
        case "text":
            const item = guild.getShopItem(subcommand.getNumber("id", true));

            if (item === null) {
                await interaction.reply({
                    embeds: [notFound(guild.lang)],
                    ephemeral: true,
                });
            } else {
                await showTextModal(interaction, item);
            }
    }
};
