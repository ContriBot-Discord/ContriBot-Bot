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
        voiceDuration: formatDuration(voiceDuration),
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

  // Build the string representation
  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);
  }

  // Join the parts with commas and 'and'
  if (parts.length === 0) {
    return "0 seconds";
  } else if (parts.length === 1) {
    return parts[0];
  } else {
    const lastPart = parts.pop();
    return parts.join(", ") + " and " + lastPart;
  }
}
