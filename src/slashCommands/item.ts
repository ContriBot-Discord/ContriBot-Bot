import {
  SlashCommandBuilder,
  CommandInteraction,
  SlashCommandSubcommandBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommand } from "@/types";

import { create } from "@/tools/shopFunctions/create";
import { edit } from "@/tools/shopFunctions/edit";
import { deleteItem } from "@/tools/shopFunctions/itemDelete";

export const command: SlashCommand = {
  name: "item",
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("Item command group.")
    .addSubcommandGroup((group) =>
      group
        .setName("create")
        .setDescription("Create a new item")
        .addSubcommand((command: SlashCommandSubcommandBuilder) =>
          command
            .setName("role")
            .setDescription("Add a new role in the shop")
            .addRoleOption((option) =>
              option
                .setName("role")
                .setDescription("The role to add")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("Description of the role")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("price")
                .setDescription("Price of the role")
                .setRequired(true)
                .setMinValue(0)
            )
            .addNumberOption((option) =>
              option
                .setName("quantity")
                .setDescription("Quantity of available roles")
                .setRequired(false)
                .setMinValue(1)
            )
        )
        .addSubcommand((command: SlashCommandSubcommandBuilder) =>
          command
            .setName("boost")
            .setDescription("Add a new boost in the shop")
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("Description of the boost")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("type")
                .setDescription("Type of the boost")
                .setRequired(true)
                .addChoices(
                    { name: "Server", value: "1" },
                  { name: "Channel", value: "2" },
                  { name: "Role", value: "3" },
                  { name: "User", value: "4" },
                )
            )
            .addNumberOption((option) =>
              option
                .setName("price")
                .setDescription("Price of the boost")
                .setRequired(true)
                .setMinValue(0)
            )
            .addNumberOption((option) =>
              option
                .setName("multiplicator")
                .setDescription("Multiplicator of the boost")
                .setRequired(true)
                .setMinValue(0)
            )

              .addStringOption((option) =>
                option
                    .setName("duration")
                    .setDescription("Duration of the boost (HHhMM format)")
                    .setRequired(true)
                    )

            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription(
                  "User's target of the boot (leave empty to let the user choose or if not applicable)"
                )
                .setRequired(false)
            )

            .addRoleOption((option) =>
                option
                    .setName("role")
                    .setDescription(
                    "Role's target of the boot (leave empty to let the user choose or if not applicable)"
                    )
                    .setRequired(false)
                )

              .addChannelOption((option) =>
                option
                    .setName("channel")
                    .setDescription(
                    "Channel's target of the boot (leave empty to let the user choose or if not applicable)"
                    )
                    .setRequired(false)
                )

            .addNumberOption((option) =>
              option
                .setName("quantity")
                .setDescription("Quantity of available roles")
                .setRequired(false)
                .setMinValue(1)
            )
        )
        .addSubcommand((command: SlashCommandSubcommandBuilder) =>
          command
            .setName("text")
            .setDescription("Add a new text in the shop")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("The name of the text")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("Description of the text")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("price")
                .setDescription("Price of the text")
                .setRequired(true)
                .setMinValue(0)
            )
        )
        .addSubcommand((command: SlashCommandSubcommandBuilder) =>
          command
            .setName("other")
            .setDescription("Add a new item in the shop")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("The name of the item")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("Description of the item")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("price")
                .setDescription("Price of the item")
                .setRequired(true)
                .setMinValue(0)
            )
            .addNumberOption((option) =>
              option
                .setName("quantity")
                .setDescription("Quantity of available items")
                .setRequired(false)
                .setMinValue(1)
            )
        )
    )
      .addSubcommandGroup((group) =>
          group
              .setName("edit")
              .setDescription("Edit an item")
              .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                      command
                          .setName("name")
                          .setDescription("Edit the name of an item shop")
                          .addNumberOption((option) =>
                                  option
                                      .setName("id")
                                      .setDescription("The id of the item to edit")
                                      .setRequired(true)
                                      .setMinValue(0)
                              )
                          .addStringOption((option) =>
                                    option
                                        .setName("name")
                                        .setDescription("The new name of the item")
                                        .setRequired(true)
                                )
              )
              .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                        command
                            .setName("description")
                            .setDescription("Edit the description of an item shop")
                            .addNumberOption((option) =>
                                    option
                                        .setName("id")
                                        .setDescription("The id of the item to edit")
                                        .setRequired(true)
                                        .setMinValue(0)
                                )
                            .addStringOption((option) =>
                                        option
                                            .setName("description")
                                            .setDescription("The new description of the item")
                                            .setRequired(true)
                                    )
                )

              .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                  command
                      .setName("text")
                      .setDescription("Add string to a Text item shop")
                      .addNumberOption((option) =>
                          option
                              .setName("id")
                              .setDescription("The id of the item to edit")
                              .setRequired(true)
                              .setMinValue(0)
                      )

              )
      )
    .addSubcommand((group) =>
      group
        .setName("delete")
        .setDescription("Delete an item")
        .addNumberOption((option) =>
          option
            .setName("id")
            .setDescription("The id of the item to delete")
            .setRequired(true)
            .setMinValue(0)
        )
    ),
  async execute(interaction: CommandInteraction) {
    let subcommand: CommandInteractionOptionResolver | string =
      interaction.options as CommandInteractionOptionResolver;

    // Retrieve the subcommand (either the subcommand or the subcommand group)
    subcommand = subcommand.getSubcommandGroup()
      ? subcommand.getSubcommandGroup()!
      : subcommand.getSubcommand()!;

    switch (subcommand) {
      case "create":
        await create(interaction);
        break;
      case "edit":
        await edit(interaction);
        break;
      case "delete":
          await deleteItem(interaction);
        break;
    }
  },
};
