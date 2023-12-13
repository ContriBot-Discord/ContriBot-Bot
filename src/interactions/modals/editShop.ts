import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import notFound from "@embeds/errors/items/itemNotFound";
import tooLong from "@embeds/errors/items/itemStringTooLong";
import negativePrice from "@embeds/errors/items/itemNegativePrice";
import stockError from "@embeds/errors/items/itemStocksError";
import roleNotFound from "@embeds/errors/roleNotFound";
import { boostNamer } from "@/tools/shopFunctions/create";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isModalSubmit()) return;

    if (!interaction.customId.includes("EditModal")) return;

    const guild = DB.getGuild(interaction.guildId!);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    if (item === null) {
      await interaction.reply({
        embeds: [notFound(guild.lang)],
        ephemeral: true,
      });
    } else {
      let label: string = "default";
      let price: number = 0;
      let quantity: number = -1;

      switch (item.action) {
        case 0: // role
          if (
            !interaction.guild?.roles.cache.has(
              interaction.fields.getTextInputValue("roleEditRole")
            )
          ) {
            await interaction.reply({
              embeds: [roleNotFound(guild.lang)],
              ephemeral: true,
            });
            return;
          }

          label = `<@&${interaction.fields.getTextInputValue("roleEditRole")}>`;
          item.description = interaction.fields.getTextInputValue(
            "roleEditDescription"
          );
          price = parseInt(
            interaction.fields.getTextInputValue("roleEditPrice")
          );
          quantity = parseInt(
            interaction.fields.getTextInputValue("roleEditStocks")
          );

          break;
        case 1: // boost
          item.description = interaction.fields.getTextInputValue(
            "boostEditDescription"
          );
          price = parseInt(
            interaction.fields.getTextInputValue("boostEditPrice")
          );
          item.multiplier = parseInt(
            interaction.fields.getTextInputValue("boostEditMultiplier")
          );
          item.boost_duration =
            interaction.fields.getTextInputValue("boostEditDuration");
          quantity = parseInt(
            interaction.fields.getTextInputValue("boostEditStocks")
          );

          label = boostNamer(item.boost_type!, item.boost_duration!, item.multiplier!, item.applied_id!);

          break;
        case 2: // text
          label = interaction.fields.getTextInputValue("textEditLabel");
          item.description = interaction.fields.getTextInputValue(
            "textEditDescription"
          );
          price = parseInt(
            interaction.fields.getTextInputValue("textEditPrice")
          );
          quantity = 1;

          break;
        case 3: // custom
          label = interaction.fields.getTextInputValue("customEditName");
          item.description = interaction.fields.getTextInputValue(
            "customEditDescription"
          );
          price = parseInt(
            interaction.fields.getTextInputValue("customEditPrice")
          );
          quantity = parseInt(
            interaction.fields.getTextInputValue("customEditStocks")
          );

          break;
        default:
          //TODO add error message
          await interaction.reply({
            content: "Unknown item type",
            ephemeral: true,
          });
          return;
          break;
      }

      if (label.length > 50) {
        await interaction.reply({
          embeds: [tooLong(guild.lang, "name", label.length, 50)],
          ephemeral: true,
        });
        return;
      }

      if (price < 0) {
        await interaction.reply({
          embeds: [negativePrice(guild.lang)],
          ephemeral: true,
        });
        return;
      }

      if (quantity < -1) {
        await interaction.reply({
          embeds: [stockError(guild.lang)],
          ephemeral: true,
        });
        return;
      }

      item.label = label;
      item.price = price;
      item.max_quantity = quantity;
      item.update();
      await interaction.reply({ content: "Item edited", ephemeral: true });
    }
  },
};

export default event;
