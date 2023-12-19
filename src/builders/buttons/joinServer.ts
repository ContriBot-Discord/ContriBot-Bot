import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("joinServer")
      .setLabel("Join server")
      .setURL(
        "https://discord.gg/wMHa7XHkNj"
      )
      .setStyle(4)
  );
}
