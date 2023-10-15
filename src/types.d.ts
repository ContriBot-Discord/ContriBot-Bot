import {
  Collection,
  CommandInteraction,
  Message,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

import { Model, DataTypes, Sequelize } from "sequelize";

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  name: string;
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface SlashCommandData {
  name: string;
  description: string;
  options?: any[];
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

interface UserAttributes {
  userId: string;
  contributionPoint: number;
  allContributionPoint: number;
}

export class ContributionUser extends Model<UserAttributes> implements UserAttributes {
  public userId!: string;
  public contributionPoint!: number;
  public allContributionPoint!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        userId: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        contributionPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        allContributionPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "User",
        timestamps: false,
      }
    );
  }
}