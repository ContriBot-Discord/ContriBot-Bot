import { Client } from "discord.js";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { BotEvent } from "@/types";

const loadInteractions = (client: Client, interactionsDir: string) => {
  const files = readdirSync(interactionsDir);

  files.forEach((file) => {
    const filePath = join(interactionsDir, file);
    const isDirectory = statSync(filePath).isDirectory();

    if (isDirectory) {
      // If it's a directory, recursively load interactions in the subdirectory
      loadInteractions(client, filePath);
    } else if (file.endsWith(".js")) {
      // If it's a JavaScript file, load the interaction
      const interaction: BotEvent = require(filePath).default;

      interaction.once
        ? client.once(interaction.name, (...args) =>
            interaction.execute(...args)
          )
        : client.on(interaction.name, (...args) =>
            interaction.execute(...args)
          );
    }
  });
};

module.exports = (client: Client) => {
  let interactionsDir = join(__dirname, "../interactions");
  loadInteractions(client, interactionsDir);

  console.log(`🤝 Successfully loaded interactions`);
};
