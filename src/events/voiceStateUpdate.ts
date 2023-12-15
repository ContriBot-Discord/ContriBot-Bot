import { BotEvent } from "@/types";
import {Events, GuildMember, VoiceBasedChannel, VoiceState} from "discord.js";
import { DB } from "@/index";
import {User} from "@/classes/User";
import {Guild} from "@/classes/Guild";

function register(user: User, channel: VoiceBasedChannel, guild: Guild) {

  // If the user comes from a blocked channel, return
  if (guild.disabledChannels.includes(channel.id)) return;

  user.voiceJoinedAt = new Date();

  // We are searching for new eligible members in the voice channel that were not registered before because there were alone in the voice channel
  const members = channel.members.filter(member => eligible(member.voice) && !registered(guild.getUser(member.id)))

  members.forEach(member => {

    // Registering every eligible & unregistered member
    register(guild.getUser(member.id), channel, guild);

  });

}

function registered(dbUser: User) {

  return dbUser.voiceJoinedAt !== null;

}

function eligible(newState: VoiceState) {

  if (newState.channel === null) return false;

  const members = newState.channel.members.filter(member => !member.user.bot)

  // If the user is a bot, is muted or deaf or is not in a voice channel or is alone in the voice channel, we return false
  // Else, True will be returned
  return !(newState.deaf || newState.mute || newState.channelId === null || members.size <= 1 || newState.member!.user.bot);

}

function givePoints(member: GuildMember, user: User, channel:  VoiceBasedChannel, guild:Guild) {

  const voiceDuration = new Date().getTime() - user.voiceJoinedAt!.getTime();
  user.addVoicePoint(
    voiceDuration,
    member.voice.channel!.id,
    member.roles.cache.map((role) => role.id)
  );


  // Represent a list of all eligible members in the voice channel
  const members = channel.members.filter(member => eligible(member.voice))

  // If the voice channel do not have enough eligible members, we are unregistering the user, and giving them their points
  if (members.size <= 1) {

    members.forEach(member => {
      user = guild.getUser(member.id);

      if (registered(user)) {

        // Giving points to every newly uneligible member
        givePoints(member, user, channel, guild);
      }
    });
  }

  user.voiceJoinedAt = null;

}



const event: BotEvent = {
  name: Events.VoiceStateUpdate,
  once: false,

  async execute(oldState: VoiceState, newState: VoiceState) {

    const guild = (oldState.guild === null) ? DB.getGuild(newState.guild.id) : DB.getGuild(oldState.guild.id);
    const user = guild.getUser(newState.member!.id);


    if (!registered(user)) {
      if (eligible(newState)) {
          register(user, newState.channel!, guild);
        }
    }

    // In the case the user IS registered as "In voice channel" in our RAM DB
    // That means the user is NOT muted, NOT deafened and is in a voice channel
    else {

      if (!eligible(newState)) {

        givePoints(newState.member!, user, newState.channel!, guild);


      } else if (
        // If the user just changed voice channel, but is still in the same guild
        newState.guild.id === oldState.guild.id &&
        newState.channelId !== oldState.channelId
      ) {

        givePoints(newState.member!, user, newState.channel!, guild);

        // We are re-registering the user as "In voice channel" in our RAM DB
        register(user, newState.channel!, guild);

      } else if (
        // If the user just changed guild but is STILL in a voice channel
        newState.guild.id !== oldState.guild.id
      ) {

        // We are giving the points to the user on the old guild
        givePoints(oldState.member!, user, oldState.channel!, guild);

        // We are registering the user on the new guild
        const newGuild = DB.getGuild(newState.guild.id);

        register(newGuild.getUser(newState.member!.id), newState.channel!, newGuild);

      }
    }
  },
};

export default event;
