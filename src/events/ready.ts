import { BotEvent } from "@/types";
import {
  Client,
  Events,
} from "discord.js";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client) {



    console.log(`💪 Logged in as ${client.user?.tag}`);
  },
};

export default event;
