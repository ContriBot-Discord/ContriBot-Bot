import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("docsButton")
      .setLabel("Documentation")
      .setURL("https://docs.contribot.app/")
      .setStyle(4)
  );
}
