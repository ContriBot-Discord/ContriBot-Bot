import {Client} from 'discord.js'
import {DB} from '@/index'


export default function (client: Client): void {

    // For each guild
    client.guilds.cache.forEach(async guild => {

        // For each channel
        guild.channels.cache.forEach(channel => {
            const guild = DB.getGuild(channel.guild.id)

            // If the channel is a voice channel
            if (channel.isVoiceBased()) {

                // For each member in the channel
                channel.members.forEach(async member => {

                    // If the member is not deafened or muted
                    if (!(member.voice.deaf || member.voice.mute)){

                        // We register the member as "In voice channel" so it can get voice xp
                        guild.getUser(member.id).voiceJoinedAt = new Date();
                    }
                });
            }
        });
    });
}
