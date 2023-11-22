import { BotEvent } from "@/types";
import {
  ActionRowBuilder,
  ButtonBuilder,
  Events,
  Interaction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { userHelpEmbed, adminHelpEmbed, configHelpEmbed } from "@/embeds/help";
import { DB } from "..";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    // If the button is not one of the three buttons, we stop the function since it's not related to the leaderboard
    if (
      !(
        interaction.customId === "Hprevious" || interaction.customId === "Hnext"
      )
    )
      return;

    const guild = DB.getGuild(interaction.guildId!);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("Hprevious").setLabel("◀︎").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("Hnext").setLabel("▶").setStyle(1)
      );

      const select = new StringSelectMenuBuilder()
      .setCustomId("Hselect")
      .setPlaceholder("Select the type of help you want")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("User")
          .setDescription("Show the user help menu.")
          .setValue("user"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Admin")
          .setDescription("Show the admin help menu.")
          .setValue("admin"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Config")
          .setDescription("Show the config help menu.")
          .setValue("config"),
      ]);

    const row = new ActionRowBuilder().addComponents(select);

    // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
    await interaction.deferUpdate();

    // Assuming the title looks like "Help [user]"
    const title = interaction.message.embeds[0].fields[0].name!;

    // Extracting the text between "[" and "]"
    const page = title.substring(title.indexOf("[") + 1, title.indexOf("]"));

    if (interaction.customId === "Hprevious") {
      switch (page) {
        case "Config":
          interaction.editReply({
            embeds: [adminHelpEmbed(guild.lang, guild.pointName)],
            components: [button, row as any],
          });
          break;
        default:
          button.components[0].setDisabled(true);
          interaction.editReply({
            embeds: [userHelpEmbed(guild.lang, guild.pointName)],
            components: [button, row as any],
          });
          break;
      }
    } else {
      switch (page) {
        case "User":
          interaction.editReply({
            embeds: [adminHelpEmbed(guild.lang, guild.pointName)],
            components: [button, row as any],
          });
          break;
        default:
          button.components[1].setDisabled(true);
          interaction.editReply({
            embeds: [configHelpEmbed(guild.lang, guild.pointName)],
            components: [button, row as any],
          });
          break;
      }
    }
  },
};

export default event;
