import { BotEvent } from "@/types";
import { Events, GuildMember } from "discord.js";
import { DB } from "..";

const event: BotEvent = {
  name: Events.GuildMemberUpdate,
  once: false,

  /*
   * @param oldMember The member before the update
   * @param newMember The member after the update
   *
   * @returns void
   */
  async execute(oldMember: GuildMember, newMember: GuildMember) {
    const guild = DB.getGuild(oldMember.guild.id);
    const user = guild.getUser(newMember.id);

    // if a user boosts the server for the first time
    if (newMember.premiumSince && !user.nitroBoost) {
      user.nitroBoost = true;
      user.addPoints(guild.boostPoint);
    }
  },
};

export default event;
