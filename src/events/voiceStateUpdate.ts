import { BotEvent } from "@/types";
import { Events, VoiceState } from "discord.js";
import { DB } from "@/index";

const event: BotEvent = {
  name: Events.VoiceStateUpdate,
  once: false,

  async execute(oldState: VoiceState, newState: VoiceState) {
    // TODO: Use a real method to add voice point, which is not added yet.

    const guild = DB.getGuild(oldState.guild.id);
    const user = guild.getUser(oldState.member!.id);

    // If the user is not registered as "In voice channel" in our RAM DB
    if (user.voiceJoinedAt === null) {
      // We are checking if the user is "eligible" for voice points
      if (!newState.deaf && !newState.mute && !(newState.channelId === null))
        return;
      // In that case, the user is eligible for voice points
      user.voiceJoinedAt = new Date();
    }
    // In the case the user IS registered as "In voice channel" in our RAM DB
    // That means the user is NOT muted, NOT deafened and is in a voice channel
    else {
      if (
        // If the user just muted itself
        (newState.mute && newState.deaf) ||
        // If the user just left the voice channel
        newState.channelId === null
      ) {
        const voiceDuration =
          new Date().getTime() - user.voiceJoinedAt!.getTime();
        user.voiceJoinedAt = null;
        user.addVoicePoint(
          voiceDuration,
          oldState.channel!.id,
          oldState.guild.id,
          oldState.member!.roles.cache.map((role) => role.id)
        );
      } else if (
        // If the user just joined a voice channel in the same guild
        // Due to previous checks, we know that the user was in a voice channel before, and is still in a voice channel
        // The last check is required, because this condition could be True if the user just start streaming or sharing his screen
        newState.guild.id === oldState.guild.id &&
        newState.channelId !== oldState.channelId
      ) {
        // In that case, we do update point (due to future point-channels multipliers)
        const voiceDuration =
          new Date().getTime() - user.voiceJoinedAt!.getTime();
        user.addVoicePoint(
          voiceDuration,
          oldState.channel!.id,
          oldState.guild.id,
          oldState.member!.roles.cache.map((role) => role.id)
        );

        // We update the user's voiceJoinedAt
        user.voiceJoinedAt = new Date();
      } else if (
        // If the user just changed guild but is STILL in a voice channel
        newState.guild.id !== oldState.guild.id
      ) {
        const newGuild = DB.getGuild(newState.guild.id);
        newGuild.getUser(newState.member!.id).voiceJoinedAt = new Date();

        const voiceDuration =
          new Date().getTime() - user.voiceJoinedAt!.getTime();
        user.voiceJoinedAt = null;
        user.addVoicePoint(
          voiceDuration,
          oldState.channel!.id,
          oldState.guild.id,
          oldState.member!.roles.cache.map((role) => role.id)
        );
      }
    }
  },
};

export default event;
