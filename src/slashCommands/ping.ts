import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  CacheType,
} from "discord.js";
import { SlashCommand } from "@/types";

export const command: SlashCommand = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the bot's ping"),
  execute: async (interaction: CommandInteraction<CacheType>) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "Anathos" })
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
          .setColor("#ff8e4d"),
      ],
    });
  },
};
