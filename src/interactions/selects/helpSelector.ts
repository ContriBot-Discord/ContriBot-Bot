import { BotEvent } from "@/types";

import {
  Events,
  Interaction,
} from "discord.js";

import { userHelpEmbed, adminHelpEmbed, configHelpEmbed } from "@embeds/help";

import helpSelect from "@/builders/selects/help";

import { DB } from "@/index";
import helpButton from "@/builders/buttons/help";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!DB.isReady) return;

    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId !== "Hselect") return;

    const guild = DB.getGuild(interaction.guildId!);

    const button = helpButton();

    // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
    await interaction.deferUpdate();

    switch (interaction.values[0]) {
      case "user":
        button.components[0].setDisabled(true);
        await interaction.editReply({
          embeds: [userHelpEmbed(guild.lang, guild.pointName)],
          components: [button, helpSelect()],
        });
        break;
      case "admin":
        await interaction.editReply({
          embeds: [adminHelpEmbed(guild.lang, guild.pointName)],
          components: [button, helpSelect()],
        });
        break;
      case "config":
        button.components[1].setDisabled(true);
        await interaction.editReply({
          embeds: [configHelpEmbed(guild.lang, guild.pointName)],
          components: [button, helpSelect()],
        });
        break;
      default:
        await interaction.editReply({
          embeds: [userHelpEmbed(guild.lang, guild.pointName)],
          components: [button, helpSelect()],
        });
        break;
    }
  },
};

export default event;
