import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

import { getColor, getEmoji } from "../../constants";
import { ColorResolvable } from "discord.js";

export const helpEmbed = function (lang: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_book") +
        i18next.t(`embeds:default.title`, { command_name: "Help" }),
      value: getEmoji("pink_line"),
    })
    .addFields({
      name: " ",
      value: i18next.t(`embeds:help.description2`),
    })
    .addFields({
      name: " ",
      value:
        getEmoji("pink_person") +
        i18next.t(`embeds:help.categories.user`) +
        "\n" +
        getEmoji("orange_shield") +
        i18next.t(`embeds:help.categories.admin`) +
        "\n" +
        getEmoji("orange_hammer") +
        i18next.t(`embeds:help.categories.config`),
    })
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
};

export const userHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_person") +
        i18next.t(`embeds:help.title`, { index: "User" }),
      value: getEmoji("pink_line"),
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
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
};

export const adminHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_shield") +
        i18next.t(`embeds:help.title`, { index: "Admin" }),
      value: getEmoji("orange_line"),
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
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
};

export const configHelpEmbed = function (lang: string, pointName: string) {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("orange_hammer") +
        i18next.t(`embeds:help.title`, { index: "Config" }),
      value: getEmoji("orange_line"),
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
    .setColor(getColor("ORANGE")!.hex as ColorResolvable)
    .setTimestamp();
};
