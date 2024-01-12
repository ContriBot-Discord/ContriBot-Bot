import actionPointEmbed from "@embeds/config/actionPoint";
import channelEmbed from "@embeds/config/channel";
import langEmbed from "@embeds/config/lang";
import pointNameEmbed from "@embeds/config/pointName";
import showEmbed from "@embeds/config/show";
import logChannelEmbed from "@embeds/config/logChannel";
const emojiRegex = require('emoji-regex');

import { CacheType, Channel, CommandInteraction } from "discord.js";

import { DB } from "@/index";

const emojiregex = emojiRegex();

export const lang = async function lang(
  interaction: CommandInteraction<CacheType>
) {
  const lang = interaction.options.get("language")?.value as string;

  const embed = langEmbed(lang);

  DB.getGuild(interaction.guildId!).setLang(lang);

  await interaction.reply({ embeds: [embed] });
};

export const logChannel = async function logChannel(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const channel = interaction.options.get("channel")?.channel as Channel;

  const embed = logChannelEmbed(
    channel.id,
    DB.getGuild(interaction.guildId!).lang
  );

  DB.getGuild(interaction.guildId!).setLogChannel(channel.id);

  await interaction.reply({ embeds: [embed] });
};

export const pointName = async function pointName(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const pointName = interaction.options.get("pointname")?.value as string;

  //If pointName is longer than 12 characters, return an error message
  if (pointName.length > 12) {
    await interaction.reply({
      content: "The point name must be 12 characters or less.",
      ephemeral: true,
    });
    return;
  }

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
  const channel = interaction.options.get("channel")?.channel as Channel;
  const value = interaction.options.get("value")?.value as string;

  const embed = channelEmbed(
    channel.id,
    DB.getGuild(interaction.guildId!).pointName,
    value,
    DB.getGuild(interaction.guildId!).lang
  );

  value === "disable"
    ? DB.getGuild(interaction.guildId!).addDisabledChannel(channel.id)
    : DB.getGuild(interaction.guildId!).removeDisabledChannel(channel.id);

  await interaction.reply({ embeds: [embed] });
};

export const show = async function show(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const embed = showEmbed(
    interaction.guildId!,
    interaction.guild!.iconURL() as string,
    DB.getGuild(interaction.guildId!).lang
  );

  await interaction.reply({ embeds: [embed] });
};


export const pointIcon = async function pointIcon(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  let emoji = interaction.options.get("emoji")?.value as string;

  // Check if the emoji is valid
  const emojiMatch = emoji.match(/<a?:.+?:\d{18}>/gu);
  if (emojiMatch || emojiregex.exec(emoji)) {

    emoji = emojiMatch ? emojiMatch[0] : emojiregex.exec(emoji);

    await interaction.reply("ui ! " + emoji)
  } else {
    await interaction.reply("nion !")
  }

};
