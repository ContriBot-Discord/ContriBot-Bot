import {Guild} from "@/classes/Guild";

export class Database{
    guilds: Guild[];

    constructor(){
        // Represent all the guilds in the database
        this.guilds = this.fetchGuilds();
    }

    fetchGuilds(): Guild[]{
        // Fetch all guilds from database

        // Since Database is not configured yet, return empty array
        return [];
    }
}