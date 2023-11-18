import {
    SlashCommandBuilder,
    CommandInteraction,
    SlashCommandSubcommandBuilder, CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommand } from "@/types";

export const command: SlashCommand = {
  name: "item",
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("Item command group.")
      .addSubcommandGroup((group) =>
        group
              .setName('create')
              .setDescription('Create a new item')
              .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                  command
                      .setName('role')
                      .setDescription('Add a new role in the shop')
                      .addRoleOption((option) =>
                            option
                                .setName('role')
                                .setDescription('The role to add')
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option
                                .setName('description')
                                .setDescription('Description of the role')
                                .setRequired(true)
                        )
                      .addNumberOption(
                            (option) =>
                                option
                                    .setName('price')
                                    .setDescription('Price of the role')
                                    .setRequired(true)
                                    .setMinValue(0)
                        )
                      .addNumberOption(
                            (option) =>
                                option
                                    .setName('quantity')
                                    .setDescription('Quantity of available roles')
                                    .setRequired(false)
                                    .setMinValue(1)
                      )
                      .addStringOption(
                            (option) =>
                                option
                                    .setName('after')
                                    .setDescription('Make the role available in the shop after a certain date (YYYY-MM-DD HH:MM:SS)')
                                    .setRequired(false)
                      )
                      .addStringOption(
                            (option) =>
                                option
                                    .setName('before')
                                    .setDescription('Make the role available in the shop before a certain date (YYYY-MM-DD HH:MM:SS)')
                                    .setRequired(false)
                      )
                      )
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command
                    .setName('boost')
                    .setDescription('Add a new boost in the shop')
                    .addStringOption((option) =>
                        option
                            .setName('description')
                            .setDescription('Description of the boost')
                            .setRequired(true)
                    )
                    .addStringOption((option) =>
                        option
                            .setName('type')
                            .setDescription('Type of the boost')
                            .setRequired(true)
                            .addChoices(
                                {name: "Channel", value: "channel"},
                                {name: "Server", value: "server"},
                                {name: "User", value: "user"},
                                {name: "Role", value: "role"}
                            )
                    )
                    .addNumberOption( (option) =>
                        option
                            .setName('price')
                            .setDescription('Price of the boost')
                            .setRequired(true)
                            .setMinValue(0)
                    )
                    .addNumberOption( (option) =>
                        option
                            .setName('multiplicator')
                            .setDescription('Multiplicator of the boost')
                            .setRequired(true)
                            .setMinValue(0)
                    )
                    .addMentionableOption(
                        (option) =>
                            option
                                .setName('target')
                                .setDescription('Target of the boost (leave empty for server boost or let the user choose)')
                                .setRequired(false)
                    )
                    .addNumberOption(
                        (option) =>
                            option
                                .setName('quantity')
                                .setDescription('Quantity of available roles')
                                .setRequired(false)
                                .setMinValue(1)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('after')
                                .setDescription('Make the role available in the shop after a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('before')
                                .setDescription('Make the role available in the shop before a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
              )
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command
                    .setName('text')
                    .setDescription('Add a new text in the shop')
                    .addStringOption((option) =>
                        option
                            .setName('name')
                            .setDescription('The name of the text')
                            .setRequired(true)
                    )
                    .addStringOption((option) =>
                        option
                            .setName('description')
                            .setDescription('Description of the text')
                            .setRequired(true)
                    )
                    .addNumberOption( (option) =>
                        option
                            .setName('price')
                            .setDescription('Price of the text')
                            .setRequired(true)
                            .setMinValue(0)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('after')
                                .setDescription('Make the role available in the shop after a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('before')
                                .setDescription('Make the role available in the shop before a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
            )
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command
                    .setName('other')
                    .setDescription('Add a new item in the shop')
                    .addStringOption((option) =>
                        option
                            .setName('name')
                            .setDescription('The name of the item')
                            .setRequired(true)
                    )
                    .addStringOption((option) =>
                        option
                            .setName('description')
                            .setDescription('Description of the item')
                            .setRequired(true)
                    )
                    .addNumberOption( (option) =>
                        option
                            .setName('price')
                            .setDescription('Price of the item')
                            .setRequired(true)
                            .setMinValue(0)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('after')
                                .setDescription('Make the role available in the shop after a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
                    .addStringOption(
                        (option) =>
                            option
                                .setName('before')
                                .setDescription('Make the role available in the shop before a certain date (YYYY-MM-DD HH:MM:SS)')
                                .setRequired(false)
                    )
                    .addNumberOption( (option) =>
                        option
                            .setName('quantity')
                            .setDescription('Quantity of available items')
                            .setRequired(false)
                            .setMinValue(1)
                    )
            )
      ),
  async execute(interaction: CommandInteraction) {
      let subcommand : CommandInteractionOptionResolver | string = (
          interaction.options as CommandInteractionOptionResolver
      );

      // Retrieve the subcommand (either the subcommand or the subcommand group)
      subcommand =  subcommand.getSubcommandGroup() ? subcommand.getSubcommandGroup()! : subcommand.getSubcommand()!;

      switch (subcommand) {
          case "create":
              await interaction.reply("Toujours WIP, faut être patient");
              break;
          case "edit":
              await interaction.reply("Toujours WIP, faut être patient");
              break;
          case "delete":
              await interaction.reply("Toujours WIP, faut être patient");
              break;
        }
      },
    };