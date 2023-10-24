import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
} from "discord.js";
import { SlashCommand } from "@/types";

import {DB} from "@/index";

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

    const lineString: string = `<:shiny_orange_bar:1163759934702374942>`.repeat(
      10
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Remove points command.",
        value: lineString,
      })
      .addFields({
        name: " ",
        value: `**${amount}** contribution points has been removed from <@${memberId}>. `,
      })
      .setColor("#ff8e4d")
      .setTimestamp();

    if (all)
      embed.spliceFields(1, 1, {
        name: " ",
        value: `${amount} total contribution points has been removed from <@${memberId}>.`,
      });

    DB.getGuild(interaction.guildId!).getUser(memberId).addPoints(-amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
