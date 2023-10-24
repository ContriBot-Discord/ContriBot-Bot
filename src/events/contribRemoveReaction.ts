import { BotEvent } from "@/types";
import { Events, MessageReaction, User, ThreadChannel } from "discord.js";
import {DB} from "@/index";

const event: BotEvent = {
    name: Events.MessageReactionRemove,
    once: false,

    async execute(messageReaction: MessageReaction, user: User) {
        if (
            messageReaction.message.channel.id !== process.env.INFO_CHANNEL_ID &&
            (messageReaction.message.channel as ThreadChannel).parentId !== process.env.MOD_CHANNEL_ID
        )
            return;

        const message = messageReaction.message;

        const userReactions = message.reactions.cache.filter((messageReaction) =>
            messageReaction.users.cache.has(user.id)
        );

        if (userReactions.size === 0) {
            DB.getGuild(message.guildId!).getUser(user.id).addPoints(-1)
          }
    },
};

export default event;