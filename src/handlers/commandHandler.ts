import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { REST, Routes } from "discord.js";
import { SlashCommand, SlashCommandData } from "@/types";

module.exports = async (client: Client) => {
  const slashCommandsDir = join(__dirname, "../slashCommands");
  const body: SlashCommandData[] = [];

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith(".js")) return;

    const slashCommand: SlashCommand =
      require(`${slashCommandsDir}/${file}`).command;

    client.slashCommands.set(slashCommand.name, slashCommand);

    body.push(slashCommand.data.toJSON());
  });

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    // Add new commands
    if (process.env.GUILD_ID) {
      // Deleting all commands in the guild
        await rest.put(
            Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
            ),
            { body: [] }
        );

      // Registering new guild commands
      await rest.post(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: body }
      );
      console.log(`⚡ Successfully registered ${body.length} application (/) commands.`);


    } else {
      // Deleting all global commands
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
          body: [],
      });

      // Registering new global commands
      await rest.post(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: body,
      });
      console.log(`⚡ Successfully registered ${body.length} application (/) commands.`);
    }
  } catch (error) {
    console.error(error);
  }
};