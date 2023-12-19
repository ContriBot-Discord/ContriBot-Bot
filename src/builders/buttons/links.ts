import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("docsButton")
        .setLabel("Documentation")
        .setURL("https://docs.contribot.app/")
        .setStyle(4)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("inviteButton")
        .setLabel("Invite bot")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=1166044244683784202&permissions=26905017642064&scope=applications.commands%20bot"
        )
        .setStyle(4)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("joinServer")
        .setLabel("Join server")
        .setURL("https://discord.gg/wMHa7XHkNj")
        .setStyle(4)
    );
}
