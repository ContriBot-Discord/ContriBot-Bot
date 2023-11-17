import { CommandInteraction } from "discord.js";

import { DB } from "..";
import {
  showEmbed,
  langEmbed,
  pointNameEmbed,
  actionPointEmbed,
  channelEmbed,
} from "@/embeds/config";

export const lang = async function lang(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const lang = interaction.options.get("language")?.value as string;

  const embed = langEmbed(lang);

  DB.getGuild(interaction.guildId!).setLang(lang);

  await interaction.reply({ embeds: [embed] });
};

export const pointName = async function pointName(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const pointName = interaction.options.get("pointname")?.value as string;

  const embed = pointNameEmbed(
    pointName,
    DB.getGuild(interaction.guildId!).lang
  );

  DB.getGuild(interaction.guildId!).setPointName(pointName);

  await interaction.reply({ embeds: [embed] });
};

export const actionPoint = async function actionPoint(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const action = interaction.options.get("action")?.value as string;
  const point = interaction.options.get("points")?.value as number;

  const embed = actionPointEmbed(
    action,
    point,
    DB.getGuild(interaction.guildId!).pointName,
    DB.getGuild(interaction.guildId!).lang
  );

  DB.getGuild(interaction.guildId!).setActionPoint(action, point);

  await interaction.reply({ embeds: [embed] });
};

export const channel = async function disableChannel(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const channel = interaction.options.get("channel_id")?.value as string;
  const value = interaction.options.get("value")?.value as string;

  const embed = channelEmbed(
    channel,
    DB.getGuild(interaction.guildId!).pointName,
    value,
    DB.getGuild(interaction.guildId!).lang
  );

  value === "disable"
    ? DB.getGuild(interaction.guildId!).addDisabledChannel(channel)
    : DB.getGuild(interaction.guildId!).removeDisabledChannel(channel);

  await interaction.reply({ embeds: [embed] });
};

export const show = async function show(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const guild = DB.getGuild(interaction.guildId!);

  const embed = showEmbed(
    interaction.guildId!,
    interaction.guild!.iconURL() as string,
    DB.getGuild(interaction.guildId!).lang
  );

  await interaction.reply({ embeds: [embed] });
};
