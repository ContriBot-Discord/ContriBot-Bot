import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export const buyButtons = function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>();
};

export const pageShopButtons = function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("Sprevious")
        .setLabel("◀︎")
        .setStyle(1)
        .setDisabled(true)
    )
    .addComponents(
      new ButtonBuilder().setCustomId("Snext").setLabel("▶").setStyle(1)
    );
};
