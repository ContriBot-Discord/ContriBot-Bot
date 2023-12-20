import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setLabel("Documentation")
        .setURL("https://docs.contribot.app/")
        .setStyle(5)
    )
    .addComponents(
      new ButtonBuilder()
        .setLabel("Invite bot")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=1166044244683784202&permissions=26905017642064&scope=applications.commands%20bot"
        )
        .setStyle(5)
    )
    .addComponents(
      new ButtonBuilder()
        .setLabel("Join server")
        .setURL("https://discord.gg/wMHa7XHkNj")
        .setStyle(5)
    );
}
