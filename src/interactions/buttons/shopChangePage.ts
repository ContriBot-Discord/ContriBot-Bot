import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

import { DB } from "@/index";
import shop from "@/builders/embeds/shop";
import interactShopButtons from "@/builders/buttons/interactShop";
import pageShopButtons from "@/builders/buttons/pageShop";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    // If the button is not one of the buttons, we stop the function since it's not related to the shop
    if (
      !(
        interaction.customId.includes("Sprevious") ||
        interaction.customId.includes("Snext")
      )
    )
      return;

    // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
    await interaction.deferUpdate();

    // We get the actual page number. Used to know which items to display
    let actualPageInt: number = parseInt(
      interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
    );

    const guild = DB.getGuild(interaction.guildId!);

    let items = [...guild.shop];

    // We get the list of items depending on the button pressed
    actualPageInt = interaction.customId.includes("Sprevious")
      ? actualPageInt - 1
      : actualPageInt + 1;

    // U is for user, A is for admin
    const pageButtons = interaction.customId.startsWith("U") ? pageShopButtons("shop") : pageShopButtons("admin");

    // If the page is 1, we disable the "previous" button
    actualPageInt === 1
      ? pageButtons.components[0].setDisabled(true)
      : pageButtons.components[0].setDisabled(false);

    // If the page is the last one, we disable the "next" button
    actualPageInt === Math.ceil(guild.shop.length / 5)
      ? pageButtons.components[1].setDisabled(true)
      : pageButtons.components[1].setDisabled(false);

    // We now do generate the embed with all the data we got
    const embed = shop(
      actualPageInt,
      Math.ceil(guild.shop.length / 5),
      items,
      guild.lang,
      guild.pointName
    );

    // editReply is required since we used deferUpdate
    // U is for user, A is for admin
    if (interaction.customId.startsWith("U")) {
      await interaction.editReply({
        embeds: [embed],
        components: [
          interactShopButtons(
            actualPageInt,
            items,
            interaction.guild?.roles.cache!,
            "buy"
          ),
          pageButtons,
        ],
      });
    } else {
      await interaction.editReply({
        embeds: [embed],
        components: [
          interactShopButtons(
            actualPageInt,
            items,
            interaction.guild?.roles.cache!,
            "edit"
          ),
          interactShopButtons(
            actualPageInt,
            items,
            interaction.guild?.roles.cache!,
            "delete"
          ),
          pageButtons,
        ],
      });
    }
  },
};

export default event;
