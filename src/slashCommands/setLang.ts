// 🗿
import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

import i18n from "i18n";

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
          // Currently supported languages:
          // 'de', 'el', 'en', 'es', 'fr', 'ia', 'it', 'ja', 'zh'
          { name: "Deutsch", value: "de" },
          { name: "Ελληνικά", value: "el" },
          { name: "English", value: "en" },
          { name: "Español", value: "es" },
          { name: "Français", value: "fr" },
          { name: "Interlingua", value: "ia" },
          { name: "Italiano", value: "it" },
          { name: "日本語", value: "ja" },
          { name: "中文", value: "zh" }
        )
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction<CacheType>) {
    const lang = interaction.options.get("language")?.value as string;

    i18n.setLocale(lang);

    const embed = new EmbedBuilder()
      .setTitle(i18n.__("setLang.embed.title"))
      .setDescription(i18n.__("setLang.embed.description"));

    DB.getGuild(interaction.guildId!).setLang(lang);

    await interaction.reply({ embeds: [embed] });
  },
};
