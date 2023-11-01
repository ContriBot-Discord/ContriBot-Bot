import schedule from 'node-schedule';
import {ClientUser} from 'discord.js';

// Should be called all days at 00:00:00
export default function (client: ClientUser) {

    // Executed every day at 00h15
    const job = schedule.scheduleJob('15 0 * * *', function () {
        let now = new Date();

        const path = './dist/assets/profilePics/';
        let profilePic = path + 'default.png';

        // If we are between the 1st december and the 31st december (included), we choose the Christmas profile pic
        if (now.getMonth() === 11) {
            profilePic = path + 'christmas.png';
        }

        // If we are between the 15st october and the 31st october (included), we choose the Halloween profile pic
        else if (now.getMonth() === 9 && now.getDate() >= 15) {
            profilePic = path + 'halloween.png';
        }

        // If we are the valentine's day (+/-1 day), we choose the Valentine's day profile pic
        else if (now.getMonth() === 1 && now.getDate() >= 13 && now.getDate() <= 15) {
            profilePic = path + 'valentine.png';
        }

        // If we are the 1st of april, we choose the April Fool profile pic
        else if (now.getMonth() === 3 && now.getDate() === 1) {
            profilePic = path + 'april.png';
        }

        // If we are the pride month (june), we choose the pride profile pic
        else if (now.getMonth() === 5) {
            profilePic = path + 'pride.png';
        }

        // Now, we change the profile pic of the bot !

        client.setAvatar(profilePic)
            .then(() => console.log(`Profile pic changed to ${profilePic}`))
            .catch(console.error);
    })

    // Allow the profile picture to be updated at the start of the bot
    job.invoke();
};

