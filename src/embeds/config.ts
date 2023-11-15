import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export const configLangEmbed = function (lang: string): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .setTitle(i18next.t(`embeds:lang.title`))
    .setDescription(i18next.t(`embeds:lang.description`));
};

export const configPointNameEmbed = function (
  pointName: string
): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(i18next.t(`embeds:pointname.title`))
    .setDescription(i18next.t(`embeds:pointname.description`));
}

export const configActionPointEmbed = function (
  action: string,
  point: number
): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(i18next.t(`embeds:actionpoint.title`))
    .setDescription(i18next.t(`embeds:actionpoint.description`));
}

export const configShowEmbed = function (iconURL: string) {
  // TODO: Obtain the real values

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t("embeds:config.title"),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(4),
    })
    .addFields({
      name: i18next.t("embeds:config.description"),
      value: ` `,
    })
    .addFields({
      name:
        `<:shinypurplestar:1163585447201607781>` +
        i18next.t("embeds:config.pointsCfg.name"),
      value: i18next.t("embeds:config.pointsCfg.value", {
        message: 1,
        react: 1,
        voice: 1,
        bump: 1,
      }),
      inline: true,
    })
    .setThumbnail(iconURL)
    .setColor("#ff8e4d")
    .setTimestamp();
};