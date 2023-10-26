import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
  SlashCommandUserOption,
} from "discord.js";
import { SlashCommand } from "../types";

import { DB } from "../index";

export const command: SlashCommand = {
  name: "resetcontribpoint",
  data: new SlashCommandBuilder()
    .setName("resetcontribpoint")
    .setDescription("Reset contribution points of a user")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("membre")
        .setDescription("Member you want to reset contribution points of")
        .setRequired(true)
    )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName("all")
        .setDescription(
          "Whether to reset all contribution points or not. (Default: false)"
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId = interaction.options.getUser("membre")!.id;
    const all = interaction.options.get("all")?.value as boolean;

    const lineString: string = `<:shiny_orange_bar:1163759934702374942>`.repeat(
      9
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Reset points command.",
        value: lineString,
      })
      .addFields({
        name: " ",
        value: `All of <@${memberId}>'s contribution points have been reset.`,
      })
      .setColor("#ff8e4d")
      .setTimestamp();

    if (all)
      embed.spliceFields(1, 1, {
        name: " ",
        value: `**All of <@${memberId}>**'s total contribution points have been reset.`,
      });

    DB.getGuild(interaction.guildId!).getUser(memberId).setPoints(0, all);

    await interaction.reply({ embeds: [embed] });
  },
};
