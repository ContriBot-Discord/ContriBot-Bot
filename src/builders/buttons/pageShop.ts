import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (
    scope: string
  ): ActionRowBuilder<ButtonBuilder> {
    const id: string = scope === "admin" ? "AS" : "US";
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(id + "previous")
          .setLabel("◀︎")
          .setStyle(1)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(id + "next")
          .setLabel("▶")
          .setStyle(1)
      );
  };