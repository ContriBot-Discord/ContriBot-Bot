import itemNotFound from "@/builders/embeds/errors/itemNotFound";
import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    if (!interaction.customId.startsWith("buy")) return;

    const guild = DB.getGuild(interaction.guildId!);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    if (item === null) {
      await interaction.reply({
        embeds: [itemNotFound(guild.lang)],
        ephemeral: true,
      });
    } else {
      //Faut coder ici Voltis
    }
  },
};

export default event;
