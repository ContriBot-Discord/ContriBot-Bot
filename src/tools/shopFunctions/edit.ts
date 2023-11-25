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
// Success
import nameSucess from "@embeds/item/edit/name";

// Errors
import notFound from "@embeds/errors/itemNotFound";
import incompatible from "@embeds/errors/itemIncompatible"
import tooLong from "@embeds/errors/itemStringTooLong";

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

    const item = guild.getShopItem(subcommand.getNumber("id", true));

    if (item === null) {
        await interaction.reply({
            embeds: [notFound(guild.lang)],
            ephemeral: true})}
    else{switch (subcommand.getSubcommand()) {

                case "text":
                    if (item.action !== 2) {  // If the item is a Text
                        await interaction.reply(
                    {
                            embeds: [incompatible(guild.lang)]
                            })}
                    else
                    {await showTextModal(interaction, item);}
        break;

    case "name":

        const label = subcommand.getString("name", true);

        if (label.length > 30) {
            await interaction.reply({
                embeds: [tooLong(guild.lang, "name", label.length, 30)],
                ephemeral: true})
        } else {
            const old_label = item.label;
            item.label = label;
            item.update();
            await interaction.reply({
                embeds: [nameSucess(guild.lang, old_label, label)]
            })
        }

        break;

    case "description":
            const description = subcommand.getString("description", true);

            if (description.length > 100) {
                await interaction.reply({
                    embeds: [tooLong(guild.lang, "description", description.length, 100)],
                    ephemeral: true})
            } else {
                item.description = description;
                item.update();
                await interaction.reply({
                    embeds: [nameSucess(guild.lang, item.description, description)]
                })
            }
            break;
    }
    }
};
