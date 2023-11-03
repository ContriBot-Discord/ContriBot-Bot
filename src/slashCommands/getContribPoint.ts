import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandBooleanOption,
  SlashCommandUserOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import getContribPoint from "@/embeds/getContribPoint";

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

    const embed = getContribPoint(memberId, amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
