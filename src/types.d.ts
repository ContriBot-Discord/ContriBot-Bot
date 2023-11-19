import {
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  name: string;
  data: Data;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface SlashCommandData {
  name: string;
  description: string;
  options?: {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required: boolean;
  }[];
  subcommands?: SlashCommandSubcommandBuilder[];
  group?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      TOKEN: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
  }
}
