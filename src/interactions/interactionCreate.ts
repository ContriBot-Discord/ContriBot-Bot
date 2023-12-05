import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import ErrorHandler from "@/tools/errors";
import error from "@embeds/error";
import {DB} from "@/index";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    // Checking if the DB is ready
    if (!DB.isReady) return;

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.slashCommands.get(
      interaction.commandName
    );

    if (!command) return;

    // Try to execute the command
    try {
      await command.execute(interaction);

    // If an unhandled error occurs, we log it and send a message to the user
    } catch (err) {


      // @ts-ignore required. We do know that this is an error
        const errorId = ErrorHandler(err, DB, interaction);

      try{
        const guild = DB.getGuild(interaction.guildId || 'err');
        const lang = guild ? guild.lang : 'en';

        interaction.reply({
            embeds: [error(lang, errorId)],
            ephemeral: true,
        });
    } catch (err) {
        // @ts-ignore
        console.log(`[${new Date().toLocaleString()}] Failed to send error message for ID #${errorId}: ${err.message}`);
      }

  }
}}

export default event;
