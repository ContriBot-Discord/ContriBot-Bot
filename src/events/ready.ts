import { BotEvent } from "@/types";
import {
  Client,
  Events,
} from "discord.js";

import fetchVoice from "@/tools/voiceFetcher"

import profilePicChooser from "@/tools/profilePicChooser";
import changePresence from "@/tools/richPresence";

// import DiscordAnalytics from "discord-analytics/discordjs";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client) {

    fetchVoice(client);
    console.log(`🎤 Fetched voice users`)

    profilePicChooser(client.user!);
    changePresence(client.user!);

    if (process.env.DEBUG === "false") {

      // const analytics = new DiscordAnalytics({
      //   client: client,
      //   eventsToTrack: {
      //     trackGuilds: true,
      //     trackGuildsLocale: true,
      //     trackInteractions: true,
      //     trackUserCount: true,
      //     trackUserLanguage: true
      //   },
      //   apiToken: process.env.DISCORD_ANALYTICS_TOKEN!,
      //   sharded: false
      // });
      //
      // analytics.trackEvents();

    }


    console.log(`💪 Logged in as ${client.user?.tag}`);
  },
};

export default event;
