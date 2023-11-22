import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";
import shopEmbed from "@/embeds/shop";
import i18next from "i18next";

export const command: SlashCommand = {
  name: "shop",
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Display the shop items"),

  async execute(interaction: CommandInteraction<CacheType>) {
    const guild = DB.getGuild(interaction.guildId!);

    await i18next.changeLanguage(guild.lang);

    // Copied list of the guild items
    let items = [...guild.shop];

    const fields: { name: string; value: string }[] = [];

    // Add the first 5 items to the embed
    for (let i = 0; i < 5; i++) {
      const item = items[i];
      if (item) {
        fields.push({
          name: ` `,
          value: `**${item.label}** - ${item.price} ${guild.pointName}\n${item.description}`,
        });
      }
    }

    const embed = shopEmbed(guild.lang, Math.ceil(guild.shop.length / 5), 0, fields);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Sprevious")
          .setLabel("◀︎")
          .setStyle(1)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("Snext").setLabel("▶").setStyle(1)
      );

    // If there are less than 5 items, disable the "next" button
    if (guild.shop.length <= 5) button.components[1].setDisabled(true);

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
