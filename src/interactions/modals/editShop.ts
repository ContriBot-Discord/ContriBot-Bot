import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import notFound from "@embeds/errors/itemNotFound";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isModalSubmit()) return;

    if (!interaction.customId.endsWith("EditModal")) return;

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
          if (
            interaction.guild?.roles.cache.has(
              interaction.fields.getTextInputValue("roleEditRole")
            )
          ) {
            interaction.reply({ content: "Role not found", ephemeral: true });
            return;
          }

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
          item.description = interaction.fields.getTextInputValue(
            "boostEditDescription"
          );
          item.price = parseInt(
            interaction.fields.getTextInputValue("boostEditPrice")
          );
          item.multiplier = parseInt(
            interaction.fields.getTextInputValue("boostEditMultiplier")
          );
          item.boost_duration = new Date(
            interaction.fields.getTextInputValue("boostEditDuration")
          );
          item.max_quantity = parseInt(
            interaction.fields.getTextInputValue("boostEditStocks")
          );

          // TODO Change Label
          const labelInput =
            interaction.fields.getTextInputValue("boostEditLabel");
          const match = labelInput.match(
            /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) x(\d+) (.+)/
          );

          if (match) {
            const [_, date, boost, text] = match;
            item.label = `${date} x${boost} ${text}`;
          } else {
            // Gérer le cas où le format n'est pas correct
            console.error("Error in boostEditModal.ts: label format");
          }

          item.update();
          break;
        case 2: // text
          item.label = interaction.fields.getTextInputValue("textEditLabel");
          item.description = interaction.fields.getTextInputValue(
            "textEditDescription"
          );
          item.price = parseInt(
            interaction.fields.getTextInputValue("textEditPrice")
          );
          break;
        case 3: // custom
          item.label = interaction.fields.getTextInputValue("customEditName");
          item.description = interaction.fields.getTextInputValue(
            "customEditDescription"
          );
          item.price = parseInt(
            interaction.fields.getTextInputValue("customEditPrice")
          );
          item.max_quantity = parseInt(
            interaction.fields.getTextInputValue("customEditStocks")
          );
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
