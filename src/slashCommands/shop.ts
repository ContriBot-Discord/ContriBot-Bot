import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
  ActionRowBuilder,
  ButtonBuilder,
  roleMention,
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

    const buyButton = new ActionRowBuilder<ButtonBuilder>()

    // Add the first 5 items to the embed
    for (let i = 0; i < 5; i++) {
      const item = items[i];
      if (item) {

        let emoji: string;

        switch (item.action) {
          case 0:
            emoji = "<:pink_at:1177169806202507314>";
            break;
          case 1:
            emoji = "<:pink_flask:1177169807972503572>";
            break;
          case 2:
            emoji = "<:pink_text:1177169814284935198>";
            break;
          default:
            emoji = "<:pink_object:1177169811420221451>";
            break;
        }

        fields.push({
          name: ` `,
          value: `${emoji}**${item.label}** - ${item.price} ${guild.pointName}\n> ${item.description}`,
        });

        // if the item is a role, add the name of the role instead of id
        if (item.action == 0) {
          const roleId = item.label.match(/<@&(\d+)>/)![1];
          item.label = interaction.guild?.roles.cache.get(roleId)?.name!;
        }

        buyButton.addComponents(
          new ButtonBuilder()
            .setCustomId(`buy-${item.id}`)
            .setLabel(item.label)
            .setEmoji(emoji)
            .setStyle(3)
        );
      }
    }

    const embed = shopEmbed(
      guild.lang,
      Math.ceil(guild.shop.length / 5),
      0,
      fields
    );

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

    await interaction.reply({
      embeds: [embed],
      components: [buyButton, button],
    });
  },
};
