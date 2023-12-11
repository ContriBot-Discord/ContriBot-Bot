import {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

import { DB } from "@/index";
import Success from "@embeds/items/create";
import Error from "@embeds/errors/items/itemCreate";


function boostNamer(boost_type: number, duration: string, multiplicator:number, applied_id: string|null): string {
  if (applied_id == null) {
    if (boost_type == 1) {
      return `${duration} x${multiplicator} Guild boost`
    } else {
      return ""
    }
  }

  else {
    switch (boost_type) {
      case 2:
        return `${duration} x${multiplicator} channel boost`
      case 3:
        return `${duration} x${multiplicator} role boost`
      case 4:
        return `${duration} x${multiplicator} user boost`
      default:
          return ""
      }
    }
}

export const create = async function create(
  interaction: CommandInteraction<CacheType>
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
  let duration: string | null;

  // Loading parameters
  switch (subcommand.getSubcommand()) {
    case "role":
      label = "<@&" + subcommand.getRole("role", true).id + ">";
      description = subcommand.getString("description", true);
      price = subcommand.getNumber("price", true);
      quantity = subcommand.getNumber("quantity", false)
        ? subcommand.getNumber("quantity", false)!
        : -1;
      action = 0;
      available = true;
      applied_id = subcommand.getRole("role", true).id;
      break;

    case "boost":
      description = subcommand.getString("description", true);
      price = subcommand.getNumber("price", true);
      quantity = subcommand.getNumber("quantity", false)
        ? subcommand.getNumber("quantity", false)!
        : -1;
      action = 1;
      available = true;
      duration = subcommand.getString("duration", true); // format: hh:mm:ss
      boost = subcommand.getNumber("multiplicator", true);
      // What a fancy way to convert a string to a number. Thank you a lot NodeJS 👍.
      boost_type = +subcommand.getString("type", true);

      // TODO: ATM, not having an applied_id set won't be handled.
      // Even if it is a mess, it is build so that it can be handled easily later.


      const applied_id_list = [ null, null,

            subcommand.getChannel("channel", false)
                ? subcommand.getChannel("channel", false)!.id
                : null,

            subcommand.getRole("role", false)
                ? subcommand.getRole("role", false)!.id
                : null,

            subcommand.getUser("user", false)
                ? subcommand.getUser("user", false)!.id
                : null,

      ]

      applied_id = applied_id_list[boost_type!];

      label = boostNamer(boost_type!, duration!, boost!, applied_id!);

      if (label == "") {
        success = false;
        break
      }

      // Convert duration to a Date object
      let durationArray = duration!.split(":");
      let durationDate = new Date();
      durationDate.setHours(+durationArray[0]);
      durationDate.setMinutes(+durationArray[1]);
      durationDate.setSeconds(+durationArray[2]);
      break;

    case "text":
      label = subcommand.getString("name", true);
      description = subcommand.getString("description", true);
      price = subcommand.getNumber("price", true);
      quantity = subcommand.getNumber("quantity", false)
        ? subcommand.getNumber("quantity", false)!
        : -1;
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
      quantity = subcommand.getNumber("quantity", false)
        ? subcommand.getNumber("quantity", false)!
        : -1;
      action = 3;
      available = true;
      applied_id = null;
      boost = null;
      boost_type = null;
      break;

    default:
      break;
  }

  if (label!.length > 50 || description!.length > 150) {
    await interaction.reply({ embeds: [Error(guild.lang)] });
    return;
  }

  if (success) {
    guild.createShopItem(
      label!,
      description!,
      price!,
      quantity!,
      action!,
      available!,
      applied_id!,
      boost!,
      boost_type!,
      duration!
    );

    await interaction.reply({ embeds: [Success(guild.lang, label!)] });
  } else {
    // TODO: Add a proper error message
    await interaction.reply("Error ! Make sur everything is correct. Also, for boosts, you must specify the targeted channel, role or user.");
  }
};
