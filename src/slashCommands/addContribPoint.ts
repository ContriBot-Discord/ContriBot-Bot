import {
  SlashCommandBuilder,
  EmbedBuilder,
  CacheType,
  CommandInteraction,
  SlashCommandUserOption,
  SlashCommandIntegerOption,
} from "discord.js";
import { SlashCommand } from "../types";

import {DB} from "../index";

export const command: SlashCommand = {
  name: "addcontribpoint",
  data: new SlashCommandBuilder()
    .setName("addcontribpoint")
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
          "Whether to add to all contribution points or not. (Default: true)"
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const memberId: string = interaction.options.getUser("member")!.id;
    const amount: number = interaction.options.get("amount")!.value as number;
    const all = interaction.options.get("all")?.value as boolean;

    const lineString: string = `<:shiny_orange_bar:1163759934702374942>`.repeat(
      9
    );

    const embed = new EmbedBuilder()
      .addFields({
        name: "<:shiny_orange_moderator:1163759368853004298> Add points command.",
        value: lineString,
      })
      .addFields({
        name: " ",
        value: `**${amount}** contribution points has been added to <@${memberId}>. `,
      })
      .setColor("#ff8e4d")
      .setTimestamp();

    if (all)
      embed.spliceFields(1, 1, {
        name: " ",
        value: `${amount} total contribution points has been added to <@${memberId}>.`,
      });

    DB.getGuild(interaction.guildId!).getUser(memberId).addPoints(amount, all);

    await interaction.reply({ embeds: [embed] });
  },
};
