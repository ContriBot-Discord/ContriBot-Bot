import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("LBprevious")
        .setLabel("◀︎")
        .setStyle(1)
        .setDisabled(true)
    )
    .addComponents(
      new ButtonBuilder().setCustomId("LBnext").setLabel("▶").setStyle(1)
    )
    .addComponents(
      new ButtonBuilder().setCustomId("LBrefresh").setLabel("↻").setStyle(1)
    );
}
