import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export const addEmbed = function (
  userId: string,
  amount: number,
  memberId: string,
  lang: string,
  scope: string = "both",
  pointName: string
) {
  i18next.changeLanguage(lang);

  let fieldName: string;

  switch (scope) {
    case "storePoints":
      fieldName = "embeds:add.description.storePoints";
      break;
    case "leaderboardPoints":
      fieldName = "embeds:add.description.leaderboardPoints";
      break;
    default:
      fieldName = "embeds:add.description.both";
      break;
  }

  return new EmbedBuilder()
    .addFields({
      name: `<:shiny_orange_moderator:1163759368853004298> ${i18next.t(
        "embeds:default.title",
        { command_name: "admin add" }
      )}`,
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(fieldName, {
        userid: userId,
        quantity: amount,
        pointsname: "points",
        memberid: memberId,
        pointName: pointName,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const removeEmbed = function (
  userId: string,
  amount: number,
  memberId: string,
  scope: string = "both",
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  let translation = "embeds:remove.description.both";
  if (scope === "leaderboardPoints")
    translation = "embeds:remove.description.leaderboardPoints";
  else if (scope === "storePoints")
    translation = "embeds:remove.description.storePoints";

  return new EmbedBuilder()
    .addFields({
      name:
        "<:shiny_orange_moderator:1163759368853004298>" +
        i18next.t("embeds:default.title", { command_name: "admin remove" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(translation, {
        userid: userId,
        quantity: amount,
        memberid: memberId,
        pointName: pointName,
      }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const resetEmbed = function (
  userId: string,
  scope: string = "both",
  lang: string,
  pointName: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  let value: string = `embeds:reset.description.both`;
  if (scope === "leaderboardPoints")
    value = `embeds:reset.description.leaderboardPoints`;
  else if (scope === "storePoints")
    value = `embeds:reset.description.storePoints`;

  return new EmbedBuilder()
    .addFields({
      name:
        "<:shiny_orange_moderator:1163759368853004298>" +
        i18next.t("embeds:default.title", { command_name: "admin reset" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(value, { userid: userId, pointName: pointName }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};

export const wipeEmbed = function (
  scope: string = "both",
  lang: string,
  pointName: string
) {
  i18next.changeLanguage(lang);

  let value: string = `embeds:wipe.description.both`;
  if (scope === "leaderboardPoints")
    value = `embeds:wipe.description.leaderboardPoints`;
  else if (scope === "storePoints")
    value = `embeds:wipe.description.storePoints`;

  return new EmbedBuilder()
    .addFields({
      name:
        "<:shiny_orange_moderator:1163759368853004298>" +
        i18next.t("embeds:default.title", { command_name: "admin wipe" }),
      value: `<:shiny_orange_bar:1163759934702374942>`.repeat(8),
    })
    .addFields({
      name: " ",
      value: i18next.t(value, { pointName: pointName }),
    })
    .setColor("#ff8e4d")
    .setTimestamp();
};
