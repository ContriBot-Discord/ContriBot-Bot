import { EmbedBuilder } from "discord.js";

import i18next from "i18next";
import { DB } from "..";

export const configLangEmbed = function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`config:default.title`, { command_name: "config lang" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
    })
    .addFields({
      name: i18next.t(`config:lang.description`),
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const configPointNameEmbed = function (
  pointName: string,
  lang: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`config:default.title`, { command_name: "config pointname" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
    })
    .addFields({
      name: i18next.t(`config:pointname.description`, { pointName: pointName }),
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const configActionPointEmbed = function (
  action: string,
  point: number,
  pointName: string,
  lang: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`config:default.title`, { command_name: "config add" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
    })
    .addFields({
      name: i18next.t(`config:actionpoint.description`, {
        action: action,
        point: point,
        pointName: pointName,
      }),
      value: ` `,
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const configShowEmbed = function (
  guild_id: string,
  iconURL: string,
  lang: string
) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t("config:default.title", { command_name: "config show" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(10),
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
        lang: DB.getGuild(guild_id).lang,
        pointName: DB.getGuild(guild_id).pointName,
      }),
      inline: true,
    })
    .setThumbnail(iconURL)
    .setColor("#ff8e4d")
    .setTimestamp();
};
