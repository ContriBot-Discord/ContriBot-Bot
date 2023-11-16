import { CommandInteraction } from "discord.js";

import { DB } from "..";
import {
  configShowEmbed,
  configLangEmbed,
  configPointNameEmbed,
  configActionPointEmbed,
} from "@/embeds/config";

export const lang = async function lang(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const lang = interaction.options.get("language")?.value as string;

  const embed = configLangEmbed(lang);

  DB.getGuild(interaction.guildId!).setLang(lang);

  await interaction.reply({ embeds: [embed] });
};

export const pointName = async function pointName(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const pointName = interaction.options.get("pointname")?.value as string;

  const embed = configPointNameEmbed(pointName, DB.getGuild(interaction.guildId!).lang);

  DB.getGuild(interaction.guildId!).setPointName(pointName);

  await interaction.reply({ embeds: [embed] });
};

export const actionPoint = async function actionPoint(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const action = interaction.options.get("action")?.value as string;
  const point = interaction.options.get("points")?.value as number;

  const embed = configActionPointEmbed(
    action,
    point,
    DB.getGuild(interaction.guildId!).pointName,
    DB.getGuild(interaction.guildId!).lang
  );

  DB.getGuild(interaction.guildId!).setActionPoint(action, point);

  await interaction.reply({ embeds: [embed] });
};

export const show = async function show(
  interaction: CommandInteraction<import("discord.js").CacheType>
) {
  const guild = DB.getGuild(interaction.guildId!);

  const embed = configShowEmbed(
    interaction.guildId!,
    interaction.guild!.iconURL() as string,
    DB.getGuild(interaction.guildId!).lang
  );

  await interaction.reply({ embeds: [embed] });
};
