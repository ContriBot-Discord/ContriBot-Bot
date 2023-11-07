import { BotEvent } from "@/types";
import {
  Client,
  Events,
  Collection,
  Message,
  TextChannel,
  ForumChannel,
  ThreadChannel,
  MessageReaction,
} from "discord.js";

import profilePicChooser from "@/tools/profilePicChooser";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client) {
    const infoChannel: TextChannel = client.channels.cache.get(
      process.env.INFO_CHANNEL_ID!
    ) as TextChannel;
    let messages: Collection<string, Message> =
      await infoChannel.messages.fetch({ limit: 30 });
    messages.forEach((msg: Message) => {
      msg.reactions.cache.forEach((reaction: MessageReaction) => {
        reaction.users.fetch();
      });
    });

    const modChannel: ForumChannel = client.channels.cache.get(
      process.env.MOD_CHANNEL_ID!
    ) as ForumChannel;

    modChannel.threads.cache.forEach(async (thread: ThreadChannel) => {
      let messages: Collection<string, Message> = await thread.messages.fetch({
        limit: 16,
        after: thread.id,
      });
      messages.forEach((msg: Message) => {
        msg.reactions.cache.forEach((reaction: MessageReaction) => {
          reaction.users.fetch();
        });
      });
    });

    profilePicChooser(client.user!);

    console.log(`💪 Logged in as ${client.user?.tag}`);
  },
};

export default event;
