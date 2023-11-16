import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  userId: string,
  pointName: string,
  storePoints: number,
  leaderboardPoints: number,
  userAvatar: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  return new EmbedBuilder()
    .addFields({
      name:
        `<:shiny_purple_bughunter:1174454832275390504>` +
        i18next.t(`embeds:default.title`, { command_name: "profile" }),
      value: `<:shiny_purple_bar:1163753428317638696>`.repeat(8),
    })
    .addFields({
      name: ` `,
      value: i18next.t(`embeds:profile.description`, { userid: userId }),
    })
    .addFields({
      name:
        `<:shiny_purple_link:1174454835978960946> ` +
        i18next.t(`embeds:profile.stats.name`),
      value: i18next.t(`embeds:profile.stats.value`),
      inline: true,
    })
    .addFields({
      name:
        `<:shiny_purple_star:1163585447201607781> ` +
        i18next.t(`embeds:profile.points.name`, { pointName: pointName }),
      value: i18next.t(`embeds:profile.points.value`, {
        pointName: pointName,
        storePoints: storePoints,
        leaderboardPoints: leaderboardPoints,
      }),
      inline: true,
    })
    .setThumbnail(userAvatar)
    .setColor("#aa54e1")
    .setTimestamp();
}
