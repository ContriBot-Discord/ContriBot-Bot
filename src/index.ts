// Required to allow the use of `@` as a path alias
import "module-alias/register";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { SlashCommand } from "@/types";
import { join } from "path";
import { readdirSync } from "fs";
import * as dotenv from "dotenv";
import i18n from "i18n";

import { Database } from "@/classes/Database";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// i18n configuration:
i18n.configure({
  locales: [
    "de",
    "el",
    "en",
    "es",
    "fr",
    "ia",
    "it",
    "ja",
    "zh",
    // Dutch, Greek, English, Spanish, French, Interlingua, Italian, Japanese, Chinese
  ],
  directory: join(__dirname, "locales"),
  objectNotation: true, // Allows to use dot notation for nested translations
  defaultLocale: "en",
  retryInDefaultLocale: true,
  updateFiles: false,
});

export const DB = new Database();

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "handlers");

readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);
