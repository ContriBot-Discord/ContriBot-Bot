import { EmbedBuilder } from "discord.js";

import i18next from "i18next";

export default function (
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