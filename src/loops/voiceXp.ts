import {Client} from 'discord.js'

// WIP: Not the final version
// Next versions will be using voiceStateUpdate event instead of checking all the guilds/channels/users every 15 minutes
export default function (client: Client) {
    while (true) {

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

                            // yay !
                            console.log("yay ! Detected !")

                        }
                    });
                }
            });
        });

    // Wait for 15 minutes
    new Promise(resolve => setTimeout(resolve, 15 * 60 * 1000)).then(() => {});

    }
}
