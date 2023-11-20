import {
    CommandInteraction,
    CommandInteractionOptionResolver, GuildMember, Role, User,
} from "discord.js";

import { DB } from "..";
import {ShopItem} from "@/classes/ShopItem";

function createItem: ShopItem(label: string, description: string, price: number, quantity: number, action: number,
                    available: boolean, applied_id: string | null, boost: number | null, boost_type: string | null,
                    textId: string | null) {

}



export const create = async function create(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const guild = DB.getGuild(interaction.guild!.id);

  let subcommand: CommandInteractionOptionResolver | string =
    interaction.options as CommandInteractionOptionResolver;

  let success = true;

  let item: ShopItem;

  // Variable initialization
    let label: string;
    let description: string;
    let price: number;
    let quantity: number;
    let action: number;
    let available: boolean;
    let applied_id: string | null;
    let boost: number | null;
    let boost_type: string | null;
    let textId: string | null;


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


          const mentionable = subcommand.getMentionable("target", false)

          if (mentionable === null || mentionable instanceof GuildMember || mentionable instanceof Role || mentionable instanceof User) {
              success = true;

              applied_id = mentionable ? mentionable.id : null;
              boost = subcommand.getNumber("boost", true);
              boost_type = subcommand.getString("boost_type", true);

          } else success = false;

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
          textId = subcommand.getString("text_id", true);
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
          textId = null;
          break;

      default:
          break;

  }
      if (success) {

          const item = createItem(label!, description!, price!, quantity!, action!, available!, applied_id!, boost!, boost_type!, textId!)

          // item.create()
          await interaction.reply(`Item ${item.id} created with success!`);
      } else {
            await interaction.reply(`Error while creating item!`);
      }


  }
};
