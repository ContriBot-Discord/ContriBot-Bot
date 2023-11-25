import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder().setCustomId("Hprevious").setLabel("◀︎").setStyle(1)
    )
    .addComponents(
      new ButtonBuilder().setCustomId("Hnext").setLabel("▶").setStyle(1)
    );
}
