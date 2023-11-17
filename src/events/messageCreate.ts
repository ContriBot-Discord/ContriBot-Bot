import { BotEvent } from "@/types";
import { Events, Message } from "discord.js";
import { DB } from "@/index";

// Create a Map to store timestamps of messages per user
const messageCooldowns = new Map<string, number>();

const event: BotEvent = {
  name: Events.MessageCreate,
  once: false,

  async execute(message: Message) {
    const guild = message.guild!;
    const user = message.author;
    const channel = message.channel;

    // If the message is from a bot, return
    if (user.bot) return;

    // If the message comes from a blocked channel, return
    if (DB.getGuild(guild.id).disabledChannels.includes(channel.id)) return;

    // Get the current time
    const now = Date.now();

    // Check if the user has a timestamp in the cache
    if (messageCooldowns.has(user.id)) {
      const cooldown = 60000; // 60 seconds in milliseconds

      // Check if 60 seconds have passed since the user's last message
      if (now - messageCooldowns.get(user.id)! >= cooldown) {
        // Add points to the user
        DB.getGuild(guild.id).getUser(user.id).addMessagePoint(channel.id, message.member!.roles.cache.map((role) => role.id));
        // Update the timestamp in the cache
        messageCooldowns.set(user.id, now);
      }
    } else {
      DB.getGuild(guild.id).getUser(user.id).addMessagePoint(channel.id, message.member!.roles.cache.map((role) => role.id));
      // If the user doesn't have a timestamp in the cache, add it
      messageCooldowns.set(user.id, now);
    }
  },
};

export default event;