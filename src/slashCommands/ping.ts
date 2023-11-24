import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

import pingEmbed from "@/builders/embeds/ping";

export const command: SlashCommand = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the bot's ping"),
  execute: async (interaction: CommandInteraction<CacheType>) => {
    await interaction.reply({
      embeds: [
        pingEmbed(
          interaction.client.ws.ping,
          DB.getGuild(interaction.guildId!).lang
        ),
      ],
    });
  },
};
