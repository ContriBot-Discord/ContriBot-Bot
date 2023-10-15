import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand, ContributionUser } from './types';
import { join } from 'path';
import { readdirSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ]
});

export const contribution = new Collection<string, ContributionUser>();

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "./handlers");

readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);