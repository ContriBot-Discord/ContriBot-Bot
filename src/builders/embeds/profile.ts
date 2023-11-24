import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji} from "../../constants";
import { ColorResolvable } from "discord.js";

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
        getEmoji("pink_person")!.value +
        i18next.t(`embeds:default.title`, { command_name: "profile" }),
      value: getEmoji("pink_line")!.value,
    })
    .addFields({
      name: ` `,
      value: i18next.t(`embeds:profile.description`, { userid: userId }),
    })
    .addFields({
      name:
        getEmoji("pink_stats")!.value +
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
        getEmoji("pink_star")!.value +
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
    .setColor(getColor("PINK")!.hex as ColorResolvable)
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
