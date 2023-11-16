import { EmbedBuilder } from "discord.js";

import i18next from "i18next";
import { DB } from "..";

export const configLangEmbed = function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298> ` +
        i18next.t(`embeds:lang.title`),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(7),
    })
    .addFields({
      name: i18next.t(`embeds:lang.description`),
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
        `<:shiny_orange_moderator:1163759368853004298> ` +
        i18next.t(`embeds:pointname.title`),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(7),
    })
    .addFields({
      name: i18next.t(`embeds:pointname.description`, { pointName: pointName }),
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
        `<:shiny_orange_moderator:1163759368853004298> ` +
        i18next.t(`embeds:actionpoint.title`),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(7),
    })
    .addFields({
      name: i18next.t(`embeds:actionpoint.description`, {
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
        `<:shiny_orange_moderator:1163759368853004298> ` +
        i18next.t("embeds:config.title"),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(4),
    })
    .addFields({
      name: i18next.t("embeds:config.description"),
      value: ` `,
    })
    .addFields({
      name:
        `<:shiny_orange_star:1174461572459020408> ` +
        i18next.t("embeds:config.pointsCfg.name", {
          pointName: DB.getGuild(guild_id).pointName,
        }),
      value: i18next.t("embeds:config.pointsCfg.value", {
        message: DB.getGuild(guild_id).messagePoint,
        vocal: DB.getGuild(guild_id).vocalPoint,
        bump: DB.getGuild(guild_id).bumpPoint,
        nitroBoost: DB.getGuild(guild_id).boostPoint,
      }),
      inline: true,
    })
    .setThumbnail(iconURL)
    .setColor("#ff8e4d")
    .setTimestamp();
};
