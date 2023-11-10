// 🗿
import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import setLangEmbed from "@/embeds/setlang";

export const command: SlashCommand = {
  name: "setlang",
  data: new SlashCommandBuilder()
    .setName("setlang")
    .setDescription("Set your language")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("What language would you like to change to ?")
        .addChoices(
          { name: "English", value: "en" },
          { name: "Français", value: "fr" },
        )
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction<CacheType>) {
    const lang = interaction.options.get("language")?.value as string;

    const embed = setLangEmbed(lang)

    DB.getGuild(interaction.guildId!).setLang(lang);

    await interaction.reply({ embeds: [embed] });
  },
};
