import {
  SlashCommandBuilder,
  CommandInteraction,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
  SlashCommandNumberOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { lang, pointName, actionPoint, show } from "@/tools/configFunctions";

import { CommandInteractionOptionResolver } from "discord.js";

export const command: SlashCommand = {
  name: "config",
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the bot.")
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("lang")
        .setDescription("Change the bot language.")
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("language")
            .setDescription("Select a language for your guild")
            .addChoices(
              { name: "English", value: "en" },
              { name: "Français", value: "fr" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("pointname")
        .setDescription("Change the point name.")
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("pointname")
            .setDescription("What would you like to change the point name to ?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("actionpoint")
        .setDescription("Change the base point for each action.")
        .addStringOption((option: SlashCommandStringOption) =>
          option
            .setName("action")
            .setDescription(
              "For which action would you like to change the base points ?"
            )
            .addChoices(
              { name: "Message", value: "message" },
              { name: "Voice", value: "voice" },
              { name: "Bump", value: "bump" },
              { name: "Nitro boost", value: "boost" }
            )
            .setRequired(true)
        )
        .addNumberOption((option: SlashCommandNumberOption) =>
          option
            .setName("points")
            .setDescription("Set the base points for this action.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName("show")
        .setDescription("Show the current configuration.")
    ),
  async execute(interaction: CommandInteraction) {
    const subcommand = (
      interaction.options as CommandInteractionOptionResolver
    ).getSubcommand();

    switch (subcommand) {
      case "lang":
        await lang(interaction);
        break;
      case "pointname":
        await pointName(interaction);
        break;
      case "actionpoint":
        await actionPoint(interaction);
        break;
      default:
        await show(interaction);
        break;
    }
  },
};
