import schedule from 'node-schedule';
import {ClientUser} from 'discord.js';
import {ActivityType} from 'discord.js';


const activities: string[] = [
    "Playing with wumpus",
    "Playing at the chrome dino game",
    "Playing at GTA 6",
    "Playing the quiet game, against myself",
    "Playing Discord Bot Simulator 2019",
    "Watching one of the ugly mee6 NFTs",
    "Watching paint dry",
    "Listening the confessions of my GPS as it gets lost again",
    "Competing on the Duolingo Saphir League",
    "Who can type 'Lorem Ipsum' the fastest",
    "May I join your voice channel ?",
    "Does anyone reads these ?",
    "I'm a bot, I'm not supposed to be funny",
    "Trading my bitcoin for dogecoin",
    "Downloading more RAM...",
    "Trying to find the 'any' key on my keyboard",
    "Hosting a virtual tea party for binary code",
    "Attempting to teach my pet rock some new tricks",
    "Playing hide and seek with my own commands",
    "Am I down ?",
    "Why can't I solve a CAPTCHA ?",
    "sudo rm -rf /",
    "Currently beeping and booping in Binary",
    "Beep Boop",
    "Photoshopping muscles onto my profile picture",
    "404: Activity not found",
    "Is twitter an X platform ?",
    "Serving as the official server weather bot—forecast: 100% virtual sunshine.",
    "I'm not a bot, I'm a highly sophisticated toaster",
    "HEEELPPP, THERE IS A BUG IN MY ROOM !",
    "41",
    "I'm a teapot",
    "Have you tried turning it off and on again ?",
    "Playing poker with Siri, Alexa and Cortana",
    "Hey Clippy, how do I close this window ?",
    "Oh ! I won a free iPhone !",
    "Is it a bird? Is it a plane? Nope, just a Superman gif",
    "NASA research to find out who asked",
    "Calculating the speed of light in km/h...it's faster than your WiFi",
    "Competing in a bad joke tournament.",
    "Listening to 8-bit music to relax.",
    "Collecting virtual stamps in my passport for visiting different servers.",
    "The 40-days free trial of ContriRAR is now over.",
    "Participating in the annual 'Ctrl+C, Ctrl+V' marathon",
    "What a cosy server you have here.",
    "The installation wizard is a very nice guy",
    "Sex update soon",                          //TODO: On la garde celle ci ?
    "Trying to find the 'undo' button for awkward social interactions",
    "How do I block someone on Discord ?",
];



export default function (client: ClientUser) {

    // Executed every day at 00h15 IF not in debug mode

    const job = schedule.scheduleJob('* * * * *', function () {

        // We choose a random string
        const string = activities[
            Math.floor(Math.random() * activities.length)
            ];

        // We set the activity
        client.setActivity({
            type: ActivityType.Custom,
            name: string
        });
    })

    // Allow the profile picture to be updated at the start of the bot
    job.invoke();

};

