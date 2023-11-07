import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import removeContribPoint from "@/embeds/remove";

export const command: SlashCommand = {
  name: "removecontribpoint",
  data: new SlashCommandBuilder()
    .setName("removecontribpoint")
    .setDescription("Remove contribution points from a user.")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("member")
        .setDescription("The user you want to remove contribution points from.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("amount")
        .setDescription(
          "The amount of contribution points to remove of the user."
        )
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("all")
        .setDescription(
          "Whether to remove to all contribution points or not. (Default: true)"
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId: string = interaction.options.getUser("member")!.id;
    const amount: number = interaction.options.get("amount")!.value as number;
    const all = interaction.options.get("all")?.value as boolean;

    const embed = removeContribPoint(amount, memberId, all);

    DB.getGuild(interaction.guildId!).getUser(memberId).addPoints(-amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
