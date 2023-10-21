import { Guild } from "./Guild";
import { UserItem } from "@/classes/UserItem";
import mysql from "mysql";

export class User{
    guild: Guild;
    id: string;
    points: number;
    allPoints: number;
    lang: string;
    inventory: UserItem[];
    #db: mysql.Connection;

    constructor(
        guild: Guild,
        id: string,
        points: number = 0,
        allPoints: number = 0,
        lang: string,
        db: mysql.Connection
    ){
        this.guild = guild;
        this.id = id
        this.points = points;
        this.allPoints = allPoints;
        this.lang = lang;
        this.inventory = this.fetchInventory();
        this.#db = db;
    }

    fetchInventory(): UserItem[]{
        // Fetch all items from database

        // Since Database is not configured yet, return empty array
        return [];
    }

    update(): void{
        // Update user in database
        // This should send all the data to the database
    }


}