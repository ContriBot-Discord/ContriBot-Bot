import { BotEvent } from "@/types";
import { Events, GuildMember } from "discord.js";
import { DB } from "..";

const event: BotEvent = {
  name: Events.GuildMemberUpdate,
  once: false,

  async execute(oldMember: GuildMember, newMember: GuildMember) {
    const guild = DB.getGuild(oldMember.guild.id);
    const user = guild.getUser(newMember.id);

    // if a user boosts the server
    if (newMember.premiumSince) {
      user.addPoints(guild.boostPoint);
    }
    // If a user removes their boost
    else if (oldMember.premiumSince && !newMember.premiumSince) {
      user.addPoints(-guild.boostPoint);
    }
  },
};

export default event;
