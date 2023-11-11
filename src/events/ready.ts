import { BotEvent } from "@/types";
import {
  Client,
  Events,
} from "discord.js";

import fetchVoice from "@/tools/voiceFetcher"

import profilePicChooser from "@/tools/profilePicChooser";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client) {

    fetchVoice(client);
    console.log(`🎤 Fetched voice users`)

    profilePicChooser(client.user!);

    console.log(`💪 Logged in as ${client.user?.tag}`);
  },
};

export default event;
