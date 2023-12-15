import { SlashCommand } from "@/types";
import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandUserOption,
} from "discord.js";

import { add, remove, reset, wipe, shop, inventory } from "@/tools/admin";

export const command: SlashCommand = {
  name: "admin",
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Admin commands.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("add")
        .setDescription("Adds points to a user.")
        .addUserOption((option: SlashCommandUserOption) =>
          option
            .setName("member")
            .setDescription("The user you want to add points to.")
            .setRequired(true)
        )
        .addIntegerOption((option: SlashCommandIntegerOption) =>
          option
            .setName("amount")
            .setDescription("The amount of points to add to the user.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("scope")
            .setDescription(
              "Specify the scope: storePoints, leaderboardPoints, or both. (Default: both)"
            )
            .setRequired(false)
            .addChoices(
              {
                name: "storePoints",
                value: "storePoints",
              },
              {
                name: "leaderboardPoints",
                value: "leaderboardPoints",
              },
              {
                name: "both",
                value: "both",
              }
            )
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("remove")
        .setDescription("Remove contribution points from a user.")
        .addUserOption((option: SlashCommandUserOption) =>
          option
            .setName("member")
            .setDescription(
              "The user you want to remove contribution points from."
            )
            .setRequired(true)
        )
        .addIntegerOption((option: SlashCommandIntegerOption) =>
          option
            .setName("amount")
            .setDescription(
              "The amount of contribution points to remove of the user."
            )
            .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("scope")
            .setDescription(
              "Specify the scope: storePoints, leaderboardPoints, or both. (Default: both)"
            )
            .setRequired(false)
            .addChoices(
              {
                name: "storePoints",
                value: "storePoints",
              },
              {
                name: "leaderboardPoints",
                value: "leaderboardPoints",
              },
              {
                name: "both",
                value: "both",
              }
            )
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("reset")
        .setDescription("Reset a user's points.")
        .addUserOption((option: SlashCommandUserOption) =>
          option
            .setName("member")
            .setDescription("The user you want to reset the points of.")
            .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("scope")
            .setDescription(
              "Specify the scope: storePoints, leaderboardPoints, or both. (Default: both)"
            )
            .setRequired(false)
            .addChoices(
              {
                name: "storePoints",
                value: "storePoints",
              },
              {
                name: "leaderboardPoints",
                value: "leaderboardPoints",
              },
              {
                name: "both",
                value: "both",
              }
            )
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("wipe")
        .setDescription("wipe contribution points of all users")
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("scope")
            .setDescription(
              "Specify the scope: storePoints, leaderboardPoints, or both. (Default: both)"
            )
            .setRequired(false)
            .addChoices(
              {
                name: "storePoints",
                value: "storePoints",
              },
              {
                name: "leaderboardPoints",
                value: "leaderboardPoints",
              },
              {
                name: "both",
                value: "both",
              }
            )
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand.setName("shop").setDescription("Admin panel for the shop.")
  //)
  //
  // .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
  //     subcommand
  //         .setName("inventory")
  //         .setDescription("See and manage the inventory of your users.")
  //         .addUserOption((option) =>
  //               option
  //                   .setName("member")
  //                   .setDescription("The user you want to see the inventory of.")
  //                   .setRequired(true)
  //           )
  //         .addBooleanOption((option) =>
  //             option
  //                 .setName("refunded")
  //                 .setDescription("Show refunded items")
  //                 .setRequired(false)
  //         )
  //         .addBooleanOption((option) =>
  //             option
  //                 .setName("used")
  //                 .setDescription("Show used items")
  //                 .setRequired(false)
  //         ),
    ),
  async execute(interaction: CommandInteraction) {
    const subcommand = (
      interaction.options as CommandInteractionOptionResolver
    ).getSubcommand();

    switch (subcommand) {
      case "add":
        await add(interaction);
        break;
      case "remove":
        await remove(interaction);
        break;
      case "reset":
        await reset(interaction);
        break;
      case "wipe":
        await wipe(interaction);
        break;
      case "shop":
        await shop(interaction);
        break;
      case "inventory":
        await inventory(interaction);
        break;
      default:
        interaction.reply({ content: "Unknown subcommand.", ephemeral: true });
    }
  },
};
