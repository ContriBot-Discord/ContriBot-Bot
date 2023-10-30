import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";
import ping from "@/embeds/ping";

export const command: SlashCommand = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the bot's ping"),
  execute: async (interaction: CommandInteraction<CacheType>) => {
    await interaction.reply({
      embeds: [
        ping(interaction.client.ws.ping)
      ],
    });
  },
};
