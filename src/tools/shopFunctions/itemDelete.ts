import {CommandInteraction, CommandInteractionOptionResolver} from "discord.js";
import {DB} from "@/index";
import itemNotFound from "@embeds/errors/itemNotFound";
import deleteSucess from "@embeds/item/delete/deleteSucess";

export const deleteItem = async function deleteItem( interaction: CommandInteraction<import("discord.js").CacheType>){

    const guild = DB.getGuild(interaction.guildId!);

    let subcommand: CommandInteractionOptionResolver | string =
        interaction.options as CommandInteractionOptionResolver;

    const item = guild.getShopItem(subcommand.getNumber("id", true));


    if (item === null) {
        await interaction.reply({
            embeds: [itemNotFound(guild.lang)],
            ephemeral: true})}
    else{
        item.delete();
        await interaction.reply({
            embeds: [deleteSucess(guild.lang, item.label, item.id!)]
        })
    }



}