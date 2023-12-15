import itemNotFound from "@embeds/errors/items/itemNotFound";
import deleteSucess from "@embeds/items/delete";
import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!DB.isReady) return;

    if (!interaction.isButton()) return;

    if (!interaction.customId.startsWith("delete")) return;

    const guild = DB.getGuild(interaction.guildId!);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    if (item === null) {
      await interaction.reply({
        embeds: [itemNotFound(guild.lang)],
        ephemeral: true,
      });
    } else {
      item.delete();
      await interaction.reply({
        embeds: [deleteSucess(guild.lang, item.id, item.label)],
        ephemeral: true,
      });
    }
  },
};

export default event;
