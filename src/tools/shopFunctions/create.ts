import {
    CommandInteraction,
    CommandInteractionOptionResolver
} from "discord.js";

import {DB} from "@/index";
import {ShopItem} from "@/classes/ShopItem";
import Error from "@/builders/embeds/item/create/error";

function createItem(guildId: string, label: string, description: string, price: number, quantity: number, action: number,
                    available: boolean, applied_id: string | null, boost: number | null, boost_type: number | null, boost_duration: Date | null): ShopItem {

    const guild = DB.getGuild(guildId);

    return guild.createShopItem(label, description, price, quantity, action, available, applied_id, boost, boost_type, boost_duration);
}


export const create = async function create(
    interaction: CommandInteraction<import("discord.js").CacheType>
) {


    const guild = DB.getGuild(interaction.guildId!);

    let subcommand: CommandInteractionOptionResolver | string =
        interaction.options as CommandInteractionOptionResolver;

    let success = true;

    // Variable initialization
    let label: string;
    let description: string;
    let price: number;
    let quantity: number;
    let action: number;
    let available: boolean;
    let applied_id: string | null;
    let boost: number | null;
    let boost_type: number | null;
    let duration: Date | null;


    // Loading parameters
    switch (subcommand.getSubcommand()) {
        case "role":
            label = "<@&" + subcommand.getRole("role", true).id + ">";
            description = subcommand.getString("description", true);
            price = subcommand.getNumber("price", true);
            quantity = subcommand.getNumber("quantity", false) ?
                subcommand.getNumber("quantity", false)! : -1;
            action = 0;
            available = true;
            applied_id = subcommand.getRole("role", true).id;
            break;


        case "boost":
            //label = subcommand.getString("name", true);
            description = subcommand.getString("description", true);
            price = subcommand.getNumber("price", true);
            quantity = subcommand.getNumber("quantity", false) ?
                subcommand.getNumber("quantity", false)! : -1
            action = 1;
            available = true;

            const string_duration = subcommand.getString("duration", true); // format: HHhMM or MM or HHh

            // Check if the duration is valid
            const duration_regex = new RegExp("^[0-9]{1,2}h[0-9]{1,2}$|^[0-9]{1,2}$|^[0-9]{1,2}h$");
            if (!duration_regex.test(string_duration)) {
                success = false;
                break;
            }

            // Convert the duration to a Date object
            const duration_array = string_duration.split("h");

            duration = new Date(0);

            if (duration_array.length == 1) {
                // Only minutes
                duration.setMinutes(+duration_array[0]);
            } else if (duration_array.length == 2) {

                // Hours and minutes
                duration.setHours(+duration_array[0]);
                duration.setMinutes(+duration_array[1]);
            }

            const stringDate = duration.getHours().toString().padStart(2, '0') + "h" + duration.getMinutes().toString().padStart(2, '0');
            +"m";

            boost = subcommand.getNumber("multiplicator", true);
            // What a fancy way to convert a string to a number. Thank you a lot NodeJS 👍.
            boost_type = +subcommand.getString("type", true);

            switch (boost_type) {
                case 1:
                    label = `${stringDate} x${boost} Server boost`;
                    break;
                case 2:
                    applied_id = subcommand.getChannel("channel", false) ? subcommand.getChannel("channel", false)!.id : null;

                    label = applied_id ? `${stringDate} x${boost} Channel boost for <#${applied_id}>` : `${stringDate} x${boost} Channel boost`;
                    break;

                case 3:
                    applied_id = subcommand.getRole("role", false) ? subcommand.getRole("role", false)!.id : null;

                    label = applied_id ? `${stringDate} x${boost} Role boost for <@&${applied_id}>` : `${stringDate} x${boost} Role boost`;
                    break;

                case 4:
                    applied_id = subcommand.getUser("user", false) ? subcommand.getUser("user", false)!.id : null;

                    label = applied_id ? `${stringDate} x${boost} User boost for <@${applied_id}>` : `${stringDate} x${boost} User boost`;
                    break;

                default:
                    success = false;
                    break;
            }
            break;

        case "text":
            label = subcommand.getString("name", true);
            description = subcommand.getString("description", true);
            price = subcommand.getNumber("price", true);
            quantity = subcommand.getNumber("quantity", false) ?
                subcommand.getNumber("quantity", false)! : -1
            action = 2;
            available = true;
            applied_id = null;
            boost = null;
            boost_type = null;
            break;

        case "other":
            label = subcommand.getString("name", true);
            description = subcommand.getString("description", true);
            price = subcommand.getNumber("price", true);
            quantity = subcommand.getNumber("quantity", false) ?
                subcommand.getNumber("quantity", false)! : -1
            action = 3;
            available = true;
            applied_id = null;
            boost = null;
            boost_type = null;
            break;

        default:
            break;

    }

    if (label!.length > 30 || description!.length > 150) {
        success = false;
    }

    if (success) {

        createItem(interaction.guildId!, label!, description!, price!, quantity!, action!, available!, applied_id!, boost!, boost_type!, duration!)


        await interaction.reply(`Item created with success!`);

    } else {
        await interaction.reply({embeds: [Error(guild.lang)]});
    }
};
