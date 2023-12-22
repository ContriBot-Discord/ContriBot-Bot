import { BotEvent } from "@/types";
import {Events, GuildChannel} from "discord.js";
import { DB } from "@/index";


const event: BotEvent = {
    name: Events.ChannelDelete,
    once: false,

    async execute(channel: GuildChannel) {
        const guild = DB.getGuild(channel.guild.id);

        guild.clearIDRelatedItems(channel.id)
    }
};

export default event;