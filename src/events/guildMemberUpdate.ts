import { BotEvent } from "@/types";
import { Events, GuildMember } from "discord.js";

const event: BotEvent = {
  name: Events.GuildMemberUpdate,
  once: false,

  async execute(oldMember: GuildMember, newMember: GuildMember) {
    // if a user boosts the server
    if (newMember.premiumSince) {
      console.log(`${oldMember.user.tag} boosted the server!`);
    }
  },
};

export default event;
