import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import notFound from "@embeds/errors/itemNotFound";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isModalSubmit()) return;

    if (!interaction.customId.startsWith("roleEditModal")) return;

    const guild = DB.getGuild(interaction.guildId!);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    if (item === null) {
      await interaction.reply({
        embeds: [notFound(guild.lang)],
        ephemeral: true,
      });
    } else {
      switch (item.action) {
        case 0: // role
          item.label = `<@&${interaction.fields.getTextInputValue(
            "roleEditRole"
          )}>`;
          item.description = interaction.fields.getTextInputValue(
            "roleEditDescription"
          );
          item.price = parseInt(
            interaction.fields.getTextInputValue("roleEditPrice")
          );
          item.max_quantity = parseInt(
            interaction.fields.getTextInputValue("roleEditStocks")
          );
          item.update();
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
      interaction.reply({ content: "Item edited", ephemeral: true });
    }
  },
};

export default event;
