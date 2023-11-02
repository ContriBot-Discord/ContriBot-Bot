import {Client, GuildMember} from 'discord.js'
import {DB} from '@/index'


function fetchVoiceUsers(client: Client): GuildMember[] {
    // Only invoked once, when the bot starts
    const voiceUsers: GuildMember[] =  [];

    // For each guild
    client.guilds.cache.forEach(async guild => {

        // For each channel
        guild.channels.cache.forEach(channel => {

            // If the channel is a voice channel
            if (channel.isVoiceBased()) {

                // For each member in the channel
                channel.members.forEach(async member => {

                    // If the member is not deafened or muted
                    if (!(member.voice.deaf || member.voice.mute)){

                        // Add the member to the voiceUsers array
                        voiceUsers.push(member);
                    }
                });
            }
        });
    });

    return voiceUsers;
}

// WIP: Not the final version
// Next versions will be using voiceStateUpdate event instead of checking all the guilds/channels/users every 15 minutes
export default function (client: Client, users: GuildMember[]) {
    // Every 15 minutes
    // Every users in the list are supposed to be eligible for voice xp

    users.forEach(async user => {

        const guild = DB.getGuild(user.guild.id);
        const db_user = guild.getUser(user.id);

        db_user.addVoiceXp();
    })

}
