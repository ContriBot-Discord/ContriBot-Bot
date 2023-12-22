import { BotEvent } from "@/types";
import {Events, Role} from "discord.js";
import { DB } from "@/index";


const event: BotEvent = {
    name: Events.GuildRoleDelete,
    once: false,

    async execute(role: Role) {
        const guild = DB.getGuild(role.guild.id);

        guild.clearIDRelatedItems(role.id)
    }
};

export default event;