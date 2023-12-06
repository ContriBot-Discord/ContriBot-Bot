import {
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

import { DB } from "@/index";
import Success from "@/builders/embeds/items/create";
import Error from "@/builders/embeds/errors/items/itemCreate";

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

      switch (boost_type) {
        case 1:
          label = `${duration} x${boost} Server boost`;
          break;
        case 2:
          applied_id = subcommand.getChannel("channel", false)
            ? subcommand.getChannel("channel", false)!.id
            : null;
          label = applied_id
            ? `${duration} x${boost} Channel boost for <#${applied_id}>`
            : `${duration} x${boost} Channel boost`;
          break;
        case 3:
          applied_id = subcommand.getRole("role", false)
            ? subcommand.getRole("role", false)!.id
            : null;
          label = applied_id
            ? `${duration} x${boost} Role boost for <@&${applied_id}>`
            : `${duration} x${boost} Role boost`;
          break;
        case 4:
          applied_id = subcommand.getUser("user", false)
            ? subcommand.getUser("user", false)!.id
            : null;
          label = applied_id
            ? `${duration} x${boost} User boost for <@${applied_id}>`
            : `${duration} x${boost} User boost`;
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

  if (label!.length > 30 || description!.length > 150) {
    success = false;
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
    await interaction.reply({ embeds: [Error(guild.lang)] });
  }
};
