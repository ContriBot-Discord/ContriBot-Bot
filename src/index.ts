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
  ],
});

// i18next config

i18next.use(Backend).init<FsBackendOptions>({
  initImmediate: false, // This is needed to prevent the backend from trying to load files before the client is ready
  lng: 'en', // Default language
  fallbackLng: 'en', // Language to fall back to if a translation is missing
  preload: ['en', 'fr'], // Languages to load at startup / Directories to load from
  ns: ['commands'], // Files to load at startup
  backend: {
    loadPath: join(__dirname, 'locales/{{lng}}/{{ns}}.yaml'),
  },
});

export const DB = new Database();

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "handlers");

readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);
