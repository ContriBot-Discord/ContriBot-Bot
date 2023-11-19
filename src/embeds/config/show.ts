import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { DB } from "../..";

export default function (guild_id: string, iconURL: string, lang: string) {
  i18next.changeLanguage(lang);

  const disabledChannels = DB.getGuild(guild_id).disabledChannels;

  let disabledChannelsText;
  if (disabledChannels.length > 0) {
    disabledChannelsText = `<#${disabledChannels.join(">, <#")}>`;

    // Check if the length exceeds 200 characters
    if (disabledChannelsText.length > 200) {
      let visibleChannels = disabledChannels.slice(); // Copy all channels

      // Trim channels until the total length fits within 200 characters
      while (
        visibleChannels.join(", ").length > 200 &&
        visibleChannels.length > 1
      ) {
        visibleChannels.pop(); // Remove the last channel
      }

      const remainingChannelsCount =
        disabledChannels.length - visibleChannels.length;

      // Update the value to include visible channels and "and x others channels"
      disabledChannelsText = `<#${visibleChannels.join(
        ">, <#"
      )}> ` + i18next.t("config:show.channels.andXOthers", { count: remainingChannelsCount });
    }
  } else {
    // Display "no channels" if there are no channels
    disabledChannelsText = i18next.t('config:show.channels.noChannels');
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
