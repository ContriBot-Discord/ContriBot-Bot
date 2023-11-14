import {
  SlashCommandBuilder,
  CommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "..";
import configShowEmbed from "@/embeds/configShow";
import configLangEmbed from "@/embeds/configLang";
import { CommandInteractionOptionResolver } from "discord.js";

export const command: SlashCommand = {
  name: "config",
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the bot.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("lang")
        .setDescription("Change the bot language.")
        .addStringOption((option) =>
          option
            .setName("language")
            .setDescription("What language would you like to change to ?")
            .addChoices(
              { name: "English", value: "en" },
              { name: "Français", value: "fr" }
            )
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
      case "show":
        await show(interaction);
        break;
    }
  },
};

async function lang(interaction: CommandInteraction<import("discord.js").CacheType>) {
  const lang = interaction.options.get("language")?.value as string;

    const embed = configLangEmbed(lang)

    DB.getGuild(interaction.guildId!).setLang(lang);

    await interaction.reply({ embeds: [embed] });
}

async function show(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const guild = DB.getGuild(interaction.guildId!);

  const embed = configShowEmbed(
    guild.lang,
    "none",
    interaction.guild!.iconURL() as string
  );

  await interaction.reply({ embeds: [embed] });
}
