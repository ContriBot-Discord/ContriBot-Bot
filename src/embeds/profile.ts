import { EmbedBuilder } from "discord.js";
import i18next from "i18next";

export default function (
  lang: string,
  userId: string,
  pointName: string,
  storePoints: number,
  leaderboardPoints: number,
  messagesSent: number,
  voiceDuration: number,
  userAvatar: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  const { hours, minutes, seconds } = formatDuration(voiceDuration);

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
      value: i18next.t(`embeds:profile.stats.value`, {
        messagesSent: messagesSent,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }),
      inline: true,
    })
    .addFields({
      name:
        `<:shiny_purple_star:1163585447201607781> ` +
        i18next.t(`embeds:profile.points.name`, {
          pointName: pointName,
        }),
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

function formatDuration(milliseconds: number) {
  // Ensure the input is a non-negative integer
  if (!Number.isInteger(milliseconds) || milliseconds < 0) {
    throw new Error(
      "Input must be a non-negative integer representing milliseconds"
    );
  }

  // Calculate hours, minutes, and seconds
  let seconds: number = Math.floor(milliseconds / 1000);
  const hours: number = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes: number = Math.floor(seconds / 60);
  seconds %= 60;

  return { hours, minutes, seconds };
}
