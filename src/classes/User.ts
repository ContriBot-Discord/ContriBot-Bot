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
        // TODO: Make sure that this request is correct
        const items: UserItem[] = [];

        // Join the inventory and the shop to get the name and description
        this.#db.query("SELECT * FROM INVENTORY INNER JOIN SHOP ON INVENTORY.item_id = SHOP.item_id WHERE user_id = ? AND guild_id = ?",
            [this.id, this.guild.id],
            (err, result) => {
            if (err) throw err;

            result.forEach((item: any) => {
                items.push(
                    new UserItem(this, item.unique_item_id, item.name, item.description, item.bought_at, item.refunded, item.refunded_at, item.used, item.used_at, this.#db
                    ));
            });
        }
        )
    return items;

    }

    update(): void{
        // Update user in database
        // This should send all the data to the database

        // If the user exists in the database, it gets updated. If not, it gets created
        this.#db.query("REPLACE INTO USER (user_id, guild_id, points, global_points, lang) VALUES (?, ?, ?, ?, ?)",
            [this.id, this.guild.id, this.points, this.allPoints, this.lang],
            (err, result) => {
                if (err) throw err;
            });

    }


}