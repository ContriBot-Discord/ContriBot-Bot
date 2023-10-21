import {Guild} from "@/classes/Guild";
import mysql from 'mysql';

export class Database{
    guilds: Guild[];
    #db: mysql.Connection;

    constructor(){
        // Represent all the guilds in the database
        this.guilds = this.fetchGuilds();
        this.#db = mysql.createConnection({
            host     : process.env.DB_HOST + ":" + process.env.DB_PORT,
            user     : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        });
    }

    getGuild(id: string): Guild{
        // Get a guild from the database
        // If the guild does not exist, create it and return it
        let guild = this.guilds.find(guild => guild.id === id);

        if (guild == undefined) {
            guild = this.createGuild(id);
        }
        // Since Database is not configured yet, return a new guild
        return guild
    }

    createGuild(id: string): Guild{
        // Create a guild in the database
        // Since Database is not configured yet, return a new guild
        let guild = new Guild(id, "en", this.#db);

        // The .update method sends data to the database.
        // With that, we can make sure that the guild is created in the database
        guild.update();

        // Once created, we add the guild to the guilds array
        this.guilds.push(guild);

        // And return it
        return guild;
    }

    fetchGuilds(): Guild[]{
        // Fetch all guilds from database

        // Since Database is not configured yet, return empty array
        return [];
    }
}