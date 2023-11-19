import {
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

import { DB } from "..";

export const create = async function create(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const guild = DB.getGuild(interaction.guild!.id);

  let subcommand: CommandInteractionOptionResolver | string =
    interaction.options as CommandInteractionOptionResolver;

  // Loading parameters
  switch (subcommand.getSubcommand()) {
    case "role":
      const label = subcommand.getRole("role", true);
      const description = subcommand.getString("description", true);
      const price = subcommand.getNumber("price", true);
      const quantity = subcommand.getNumber("quantity", false);

      const item = guild.createShopItem(
        `<@&${label!.id}>`,
        description,
        price,
        quantity ? quantity : -1,
        0,
        true
      );
      break;
  }

  await interaction.reply("Item created");
};
