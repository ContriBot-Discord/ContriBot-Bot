import {
  SlashCommandBuilder,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import boostNotFoundInventory from "@/builders/embeds/errors/boosts/boostNotFoundInventory";
import i18next from "i18next";

export const command: SlashCommand = {
  name: "boost",
  data: new SlashCommandBuilder()
    .setName("boost")
    .setDescription("Use a boost from your inventory")
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("ID of the boost to apply")
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction: CommandInteraction) {
    const guild = DB.getGuild(interaction.guildId!);

    await i18next.changeLanguage(guild.lang);

    const user = guild.getUser(interaction.user.id);

    const options = interaction.options as CommandInteractionOptionResolver;

    const boostId = options.getInteger("id", true);

    const item = user.inventory.find(
      (item) => item.id == boostId && item.itemType === 1 && !item.used
    );

    if (!item) {
      await interaction.reply({
        embeds: [boostNotFoundInventory(guild.lang)],
        ephemeral: true,
      });
      return;
    }

    const extendedBoost = guild.applyBoost(item.toBoost());

    let appliedIdMention: string | null;

    switch (item.boostType) {
      case 1: // guild
        appliedIdMention = i18next.t("embeds:commands.boost.guild");
        break;

      case 2: // channel
        appliedIdMention = `<#${item.appliedId}>`;
        break;

      case 3: // role
        appliedIdMention = `<@&${item.appliedId}>`;
        break;

      case 4: // User
        appliedIdMention = `<@${item.appliedId}>`;
        break;

      default:
        appliedIdMention = "something I couldn't find";
    }

    if (extendedBoost) {
      await interaction.reply({
        content:
        i18next.t("embeds:commands.boost.extended"),
        ephemeral: true,
      });
    } else {
      // Retrieve the applied id from the cache and mention it

      await interaction.reply({
        content: i18next.t("embeds:commands.boost.applied", {
          appliedIdMention: appliedIdMention,
        }),
        ephemeral: true,
      });
    }

    item.used = true;
    item.update();
  },
};
