import { EmbedBuilder } from "discord.js";

import i18next from "i18next";
import { DB } from "../..";

export default function (guild_id: string, iconURL: string, lang: string) {
  i18next.changeLanguage(lang);

  const disabledChannels = DB.getGuild(guild_id).disabledChannels;
  let disabledChannelsText = `<#${disabledChannels.join(">, <#")}>`;

  // Check if the length exceeds 220 characters
  if (disabledChannelsText.length > 220) {
    // Display only the first few channels and calculate the remaining count
    const visibleChannels = disabledChannels.slice(0, 5); // Adjust the number as needed
    const remainingChannelsCount =
      disabledChannels.length - visibleChannels.length;

    // Update the value to include visible channels and "and x others channels"
    disabledChannelsText = `<#${visibleChannels.join(
      ">, <#"
    )}> and ${remainingChannelsCount} others channels`;
  }

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t("config:default.title", { command_name: "config show" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: i18next.t("config:show.description"),
      value: ` `,
    })
    .addFields({
      name:
        `<:shiny_orange_star:1174461572459020408> ` +
        i18next.t("config:show.pointsCfg.name", {
          pointName: DB.getGuild(guild_id).pointName,
        }),
      value: i18next.t("config:show.pointsCfg.value", {
        message: DB.getGuild(guild_id).messagePoint,
        voice: DB.getGuild(guild_id).voicePoint,
        bump: DB.getGuild(guild_id).bumpPoint,
        nitroBoost: DB.getGuild(guild_id).boostPoint,
      }),
      inline: true,
    })
    .addFields({
      name:
        "<:shiny_orange_staff:1174461570437361684> " +
        i18next.t("config:show.settings.name"),
      value: i18next.t("config:show.settings.value", {
        pointName: DB.getGuild(guild_id).pointName,
      }),
      inline: true,
    })
    .addFields([
      {
        name: i18next.t("config:show.channels.name"),
        value: disabledChannelsText,
      },
    ])
    .setThumbnail(iconURL)
    .setColor("#ff8e4d")
    .setTimestamp();
}
