import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
  SlashCommandUserOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

export const command: SlashCommand = {
  name: "getcontribpoint",
  data: new SlashCommandBuilder()
    .setName("getcontribpoint")
    .setDescription("Gets contribution points of a user")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("membre")
        .setDescription("Member you want to see contribution points of")
        .setRequired(true)
    )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName("all")
        .setDescription(
          "Whether to get all contribution points or not. (Default: false)"
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId = interaction.options.getUser("membre")!.id;
    const all = interaction.options.get("all")?.value as boolean;
    const amount = DB.getGuild(interaction.guildId!)
      .getUser(memberId)
      .getContribPoint(true);

    const lineString: string = `<:lineviolett:1163753428317638696>`.repeat(9);

    const embed = new EmbedBuilder()
      .addFields({
        name: " ",
        value: `**<:shinypurplestar:1163585447201607781> Get points command.**`,
      })
      .addFields({
        name: " ",
        value: lineString,
      })
      .addFields({
        name: " ",
        value: `<@${memberId}> has **${amount}** contributution point(s). `,
      })
      .setColor("#AA54E1")
      .setTimestamp();

    if (all)
      embed.spliceFields(2, 1, {
        name: " ",
        value: `<@${memberId}> has **${amount}** total contribution point(s).`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};
