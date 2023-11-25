import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

import { DB } from "@/index";
import leaderboardEmbed from "@embeds/leaderboard";

import leaderboardButton from "@/builders/buttons/leaderboard";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    // If the button is not one of the three buttons, we stop the function since it's not related to the leaderboard
    if (
      !(
        interaction.customId === "LBprevious" ||
        interaction.customId === "LBnext" ||
        interaction.customId === "LBrefresh"
      )
    )
      return;

    // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
    await interaction.deferUpdate();

    // We get the actual page number. Used to know which users to display
    let actualPageInt: number = parseInt(
      interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
    );

    // We sort the users by their total points
    const guild = DB.getGuild(interaction.guildId!);

    const users = [...guild.users];

    // We get the list of users depending on the button pressed
    if (interaction.customId === "LBprevious") {
      actualPageInt -= 1;
    } else if (interaction.customId === "LBnext") {
      actualPageInt += 1;
    }

    // we initialize the buttons, and make them disabled if needed
    const button = leaderboardButton();

    // If the page is 1, we disable the "previous" button
    actualPageInt === 1
      ? button.components[0].setDisabled(true)
      : button.components[0].setDisabled(false);

    // If the page is the last one, we disable the "next" button
    actualPageInt === Math.ceil(guild.users.length / 10)
      ? button.components[1].setDisabled(true)
      : button.components[1].setDisabled(false);

    // We now do generate the embed with all the data we got
    const embed = leaderboardEmbed(
      actualPageInt,
      Math.ceil(guild.users.length / 10),
      users,
      guild.lang,
      guild.pointName
    );

    // editReply is required since we used deferUpdate
    await interaction.editReply({ embeds: [embed], components: [button] });
  },
};

export default event;
