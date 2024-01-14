import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

import profileEmbed from "@embeds/profile";

export const command: SlashCommand = {
  name: "profile",
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Show your profile or someone else's profile.")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The user you want to see the profile of.")
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);
    const userId = interaction.options.getUser("member")?.id || interaction.user.id;
    const user = guild.getUser(userId);
    const userAvatar = interaction.options.getUser("member")?.displayAvatarURL() || interaction.user.displayAvatarURL();

    const embed = profileEmbed(
      guild.lang,
      userId,
      guild.pointName,
      user.storePoints,
      user.leaderboardPoints,
      user.messagesSent,
      user.voiceDuration,
      userAvatar
    );

    await interaction.reply({ embeds: [embed] });
  },
};
