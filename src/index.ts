// Required to allow the use of `@` as a path alias
import "module-alias/register";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { SlashCommand } from "@/types";
import { join } from "path";
import { readdirSync } from "fs";
import * as dotenv from "dotenv";
import i18next from 'i18next';
import Backend, {FsBackendOptions} from 'i18next-fs-backend';


import { Database } from "@/classes/Database";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// i18next config

i18next.use(Backend).init<FsBackendOptions>({
  initImmediate: false, // Required to prevent i18next from trying to load translations before the bot is ready
  fallbackLng: 'en', // Fallback language (if a translation is missing)
  preload: ['en', 'fr', 'ru'], // List of languages to load translations for
  ns: ['errors', 'embeds', 'config'], // Files to load translations from (./locales/fr/commands.yaml for instance)
  backend: {
    loadPath:  './locales/{{lng}}/{{ns}}.yaml', // Path to translation files
  },
});

export const DB = new Database();

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "handlers");

readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);
