import schedule from 'node-schedule';
import {ClientUser} from 'discord.js';


// Pretty long typehint, huh ?
const Dates: {start:{month:number, day:number}, end:{month: number, day: number}, profilePic:string}[] = [
    {
        start: {month: 11,  day: 1},
        end: {month: 11, day: 31},
        profilePic: "christmas.png"
    },
    {
        start: {month: 9, day: 15},
        end: {month: 9, day: 31},
        profilePic: "halloween.png"
    },
    {
        start: {month: 1, day: 13},
        end: {month: 1, day: 15},
        profilePic: "valentine.png"
    },
    {
        start: {month: 3, day: 1},
        end: {month: 3, day: 1},
        profilePic: "april.png"
    },
    {
        start: {month: 5, day: 1},
        end: {month: 5, day: 31},
        profilePic: "pride.png"
    }
];



// Should be called all days at 00:00:00
export default function (client: ClientUser) {

    // Executed every day at 00h15 IF not in debug mode
    if (process.env.DEBUG === "false") {
        const job = schedule.scheduleJob('15 0 * * *', function () {

            let now = new Date();

            let profilePic = 'default.png';

            // We check if we are in a special period
            for (let date of Dates) {

                // We create a new Date object with the current year and the start/end month and day
                const start_date = new Date(now.getFullYear(), date.start.month, date.start.day);
                const end_date = new Date(now.getFullYear(), date.end.month, date.end.day);

                if (
                    // Simple Timestamp comparison
                    (now.getTime() >= start_date.getTime()) && (now.getTime() <= end_date.getTime())
                ) {
                    profilePic = date.profilePic;
                    break;
                }
            }

            // Now, we change the profile pic of the bot !

            client.setAvatar('./assets/profilePics/' + profilePic)
                .then(() => console.log(`Profile pic changed to ${profilePic}`))
                .catch(console.error);
        })

        // Allow the profile picture to be updated at the start of the bot
        job.invoke();
    }
};

