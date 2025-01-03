import { EmbedBuilder } from "discord.js";
import i18next from "i18next";
import { getColor, getEmoji} from "@/constants";
import { ColorResolvable } from "discord.js";

export default function (
  lang: string,
  userId: string,
  pointName: string,
  storePoints: number,
  leaderboardPoints: number,
  messagesSent: number,
  voiceDuration: bigint,
  nitroBoost: boolean,
  bumpCount: number,
  userAvatar: string
): EmbedBuilder {
  i18next.changeLanguage(lang);

  const { hours, minutes, seconds } = formatDuration(voiceDuration);

  return new EmbedBuilder()
    .addFields({
      name:
        getEmoji("pink_person") +
        i18next.t(`embeds:default.title`, { command_name: "profile" }),
      value: getEmoji("pink_line"),
    })
    .addFields({
      name: ` `,
      value: i18next.t(`embeds:profile.description`, { userid: userId }),
    })
    .addFields({
      name:
        getEmoji("pink_stats") +
        i18next.t(`embeds:profile.stats.name`),
      value: i18next.t(`embeds:profile.stats.value`, {
        messagesSent: messagesSent,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        bumps: bumpCount,
      }),
      inline: true,
    })
    .addFields({
      name:
        getEmoji("pink_star") +
        i18next.t(`embeds:profile.points.name`, {
          pointName: pointName,
        }),
      value: i18next.t(`embeds:profile.points.value`, {
        pointName: pointName,
        storePoints: Math.floor(storePoints),
        leaderboardPoints: Math.floor(leaderboardPoints),
        nitroBoost: nitroBoost ? i18next.t("embeds:words.received") : i18next.t("embeds:words.admissible"),
      }),
      inline: true,
    })
    .setThumbnail(userAvatar)
    .setColor(getColor("PINK")!.hex as ColorResolvable)
    .setTimestamp();
}

function formatDuration(milliseconds: bigint) {
  // Ensure the input is a non-negative bigint
  if (milliseconds < 0n) {
    throw new Error(
      "Input must be a non-negative integer representing milliseconds"
    );
  }

  // Calculate hours, minutes, and seconds
  let seconds: number = Math.floor(Number(milliseconds) / 1000);
  const hours: number = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes: number = Math.floor(seconds / 60);
  seconds %= 60;

  return { hours, minutes, seconds };
}