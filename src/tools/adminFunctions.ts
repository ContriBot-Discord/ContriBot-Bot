import addEmbed from "../embeds/admin/add";
import removeEmbed from "../embeds/admin/remove";
import resetEmbed from "../embeds/admin/reset";
import wipeEmbed from "../embeds/admin/wipe";

import { CacheType, CommandInteraction } from "discord.js";
import { DB } from "..";

export const add = async function add(
  interaction: CommandInteraction<CacheType>
) {
  const memberId: string = interaction.options.getUser("member")!.id;
  const amount: number = interaction.options.get("amount")!.value as number;
  const scope = interaction.options.get("scope")?.value as string;
  const guild = DB.getGuild(interaction.guildId!);

  const embed = addEmbed(
    interaction.user.id,
    amount,
    memberId,
    guild.lang,
    scope,
    guild.pointName
  );

  guild.getUser(memberId).addPoints(amount, scope);

  await interaction.reply({ embeds: [embed] });
};

export const remove = async function remove(
  interaction: CommandInteraction<CacheType>
) {
  const memberId: string = interaction.options.getUser("member")!.id;
  const amount: number = interaction.options.get("amount")!.value as number;
  const scope = interaction.options.get("scope")?.value as string;

  const guild = DB.getGuild(interaction.guildId!);

  const embed = removeEmbed(
    interaction.user.id,
    amount,
    memberId,
    scope,
    guild.lang,
    guild.pointName
  );

  guild.getUser(memberId).addPoints(-amount, scope);

  await interaction.reply({ embeds: [embed] });
};

export const reset = async function reset(
  interaction: CommandInteraction<CacheType>
) {
  const memberId = interaction.options.getUser("member")!.id;
  const scope = interaction.options.get("scope")?.value as string;
  const guild = DB.getGuild(interaction.guildId!);

  const embed = resetEmbed(memberId, scope, guild.lang, guild.pointName);

  guild.getUser(memberId).setPoints(0, scope);

  await interaction.reply({ embeds: [embed] });
};

export const wipe = async function wipe(
  interaction: CommandInteraction<CacheType>
) {
  const scope = interaction.options.get("scope")?.value as string;
  const guild = DB.getGuild(interaction.guildId!);

  const embed = wipeEmbed(scope, guild.lang, guild.pointName);

  // Reset all users' points in database, and then update the cache
  guild.resetPoints();

  await interaction.reply({ embeds: [embed] });
};
