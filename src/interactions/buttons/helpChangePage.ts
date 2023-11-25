import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import {
  userHelpEmbed,
  adminHelpEmbed,
  configHelpEmbed,
} from "@/builders/embeds/help";
import helpSelect from "@/builders/selects/help";
import helpButton from "@/builders/buttons/help";
import { DB } from "@/index";

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

    const button = helpButton();

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
            components: [button, helpSelect()],
          });
          break;
        default:
          button.components[0].setDisabled(true);
          interaction.editReply({
            embeds: [userHelpEmbed(guild.lang, guild.pointName)],
            components: [button, helpSelect()],
          });
          break;
      }
    } else {
      switch (page) {
        case "User":
          interaction.editReply({
            embeds: [adminHelpEmbed(guild.lang, guild.pointName)],
            components: [button, helpSelect()],
          });
          break;
        default:
          button.components[1].setDisabled(true);
          interaction.editReply({
            embeds: [configHelpEmbed(guild.lang, guild.pointName)],
            components: [button, helpSelect()],
          });
          break;
      }
    }
  },
};

export default event;
