import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export const helpEmbed = function (lang: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_purple_bughunter:1174454832275390504>` +
        i18next.t(`embeds:default.title`, { command_name: "Help" }),
      value: `<:shiny_purple_bar:1163753428317638696>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(`embeds:help.description2`),
    })
    .addFields({
      name: " ",
      value:
        i18next.t(`embeds:help.categories.user`) +
        "\n" +
        i18next.t(`embeds:help.categories.admin`) +
        "\n" +
        i18next.t(`embeds:help.categories.config`),
    })
    .setColor("#aa54e1")
    .setTimestamp();
};

export const userHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_purple_bughunter:1174454832275390504>` +
        i18next.t(`embeds:help.title`, { index: "User" }),
      value: `<:shiny_purple_bar:1163753428317638696>`.repeat(8),
    })
    .addFields({
      name: "/profile (member)",
      value: i18next.t(`embeds:help.user.profile.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "/leaderboard",
      value: i18next.t(`embeds:help.user.leaderboard.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "/whois",
      value: i18next.t(`embeds:help.user.whois.value`),
    })
    .addFields({
      name: "/ping",
      value: i18next.t(`embeds:help.user.ping.value`),
    })
    .setColor("#aa54e1")
    .setTimestamp();
};

export const adminHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`embeds:help.title`, { index: "Admin" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(`embeds:help.admin.description`),
    })
    .addFields({
      name: "add (member) (quantity)",
      value: i18next.t(`embeds:help.admin.add.value`, { pointName: pointName }),
    })
    .addFields({
      name: "remove (member) (quantity) (scope)",
      value: i18next.t(`embeds:help.admin.remove.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "reset (member)",
      value: i18next.t(`embeds:help.admin.reset.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "wipe",
      value: i18next.t(`embeds:help.admin.wipe.value`, {
        pointName: pointName,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const configHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_orange_moderator:1163759368853004298>` +
        i18next.t(`embeds:help.title`, { index: "Config" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(`embeds:help.config.description`),
    })
    .addFields({
      name: "show",
      value: i18next.t(`embeds:help.config.show.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "lang (language)",
      value: i18next.t(`embeds:help.config.lang.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "pointname (pointname)",
      value: i18next.t(`embeds:help.config.pointname.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "action (action) (quantity)",
      value: i18next.t(`embeds:help.config.action.value`, {
        pointName: pointName,
      }),
    })
    .addFields({
      name: "channel (channel) (value)",
      value: i18next.t(`embeds:help.config.channel.value`, {
        pointName: pointName,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};
