import { BotEvent } from "@/types";
import {
  ActionRowBuilder,
  ButtonBuilder,
  Events,
  Interaction,
} from "discord.js";

import { DB } from "@/index";
import { ShopItem } from "@/classes/ShopItem";
import shop from "@/embeds/shop";

import i18next from "i18next";

function getItemList(
  startingFrom: number,
  itemList: ShopItem[],
  lang: string,
  pointName: string
): { name: string; value: string }[] {
  i18next.changeLanguage(lang);

  const fields: { name: string; value: string }[] = [];

  // We add the n + 5 first items to the embed. If there are less than 5 items, we stop the loop.
  for (let i = startingFrom; i < startingFrom + 5 || i < itemList.length; i++) {
    const item = itemList[i];

    if (item) {
      fields.push({
        name: ` `,
        value: `**${item.label}** - ${item.price} ${pointName}\n${item.description}`,
      });
    }
  }
  return fields;
}

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    // If the button is not one of the buttons, we stop the function since it's not related to the shop
    if (
      !(
        interaction.customId === "Sprevious" || interaction.customId === "Snext"
      )
    )
      return;

    // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
    await interaction.deferUpdate();

    // We get the actual page number. Used to know which items to display
    const actualPageInt: number = parseInt(
      interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
    ) - 1;

    const guild = DB.getGuild(interaction.guildId!);
    let items = [...guild.shop];

    // We initialize the fields variable so it can be edited in the if statements
    let fields: { name: string; value: string }[] = [];

    // We get the list of items depending on the button pressed
    if (interaction.customId === "Sprevious") {
      fields = getItemList(
        (actualPageInt - 1) * 5,
        items,
        guild.lang,
        guild.pointName
      );
    } else if (interaction.customId === "Snext") {
      fields = getItemList(
        (actualPageInt + 1) * 5,
        items,
        guild.lang,
        guild.pointName
      );
    }

    // we initialize the buttons, and make them disabled if needed
    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("Sprevious").setLabel("◀︎").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("Snext").setLabel("▶").setStyle(1)
      );

    // If the page is 1, we disable the "previous" button
    if ((actualPageInt) === 1) button.components[0].setDisabled(true);

    // If the page is the last one, we disable the "next" button
    if ((actualPageInt) === Math.ceil(guild.shop.length / 5))
      button.components[1].setDisabled(true);

    // We now do generate the embed with all the data we got
    const embed = shop(guild.lang, Math.ceil(guild.shop.length / 5), (actualPageInt), fields);

    // editReply is required since we used deferUpdate
    await interaction.editReply({ embeds: [embed], components: [button] });
  },
};

export default event;
