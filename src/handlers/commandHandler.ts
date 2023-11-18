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
    // Get all commands
    const commands: any = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));

    // Delete all commands
    for (const command of commands) {
      await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, command.id));
    }

    // Add new commands
    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: body }
      );
      console.log("⚡ Successfully reloaded application (/) commands.");
    } else {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: body,
      });
      console.log("⚡ Successfully reloaded application (/) commands.");
    }
  } catch (error) {
    console.error(error);
  }
};