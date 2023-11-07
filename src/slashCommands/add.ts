import {
  SlashCommandBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";
import addEmbed from "@/embeds/add";

export const command: SlashCommand = {
  name: "add",
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds contribution points to a user.")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("member")
        .setDescription("The user you want to add contribution points to.")
        .setRequired(true)
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("amount")
        .setDescription("The amount of contribution points to add to the user.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("all")
        .setDescription(
          "Whether to add to leaderboard points or not. (Default: true)"
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId: string = interaction.options.getUser("member")!.id;
    const amount: number = interaction.options.get("amount")!.value as number;
    const all = interaction.options.get("all")?.value as boolean;

    const embed = addEmbed(
        interaction.user.id,
        amount,
        memberId,
        interaction.guildId!,
        all
    )

    DB.getGuild(interaction.guildId!).getUser(memberId).addPoints(amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
