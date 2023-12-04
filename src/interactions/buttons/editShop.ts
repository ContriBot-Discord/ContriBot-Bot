import itemNotFound from "@/builders/embeds/errors/itemNotFound";
import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import { roleEditModal } from "@/builders/modals/shop";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    if (!interaction.customId.startsWith("edit")) return;

    const guild = DB.getGuild(interaction.guildId!);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    if (item === null) {
      await interaction.reply({
        embeds: [itemNotFound(guild.lang)],
        ephemeral: true,
      });
    } else {
      switch (item.action) {
        case 0: // role
          roleEditModal(interaction, item);
          break;
        case 1: // boost
          break;
        case 2: // text
          break;
        case 3: // custom
          break;
        default:
          //TODO add error message
          interaction.reply({ content: "Unknown item type", ephemeral: true });
          break;
      }
    }
  },
};

export default event;
