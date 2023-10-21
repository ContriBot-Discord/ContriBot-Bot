import { User } from "./User";
import {ShopItem} from "@/classes/ShopItem";
import mysql from 'mysql';

export class Guild{
    id: string;
    lang: string;
    users: User[];
    shop: ShopItem[];
    #db: mysql.Connection;

    constructor(
        id: string,
        lang: string,
        db: mysql.Connection
    ){
        this.id = id;
        this.lang = lang;
        this.shop = this.fetchShop();
        this.users = this.fetchUsers();
        this.#db = db;
    }

    getUser(id: string): User{
        // Get a user from the database
        // If the user does not exist, create it and return it
        let user = this.users.find(user => user.id === id);

        if (user == undefined) {
            user = this.createUser(id);
        }

        return user
    }

    createUser(id: string): User{

        // Create a guild in the database
        // Since Database is not configured yet, return a new guild
        let user = new User(this, id, 0, 0, this.lang, this.#db);

        // The .update method sends data to the database.
        // With that, we can make sure that the user is created in the database
        user.update();

        // Once created, we add the user to the guilds array
        this.users.push(user);

        // And return it
        return user;

    }

    update(): void{
        // Update guild in database
        // This should send all the data to the database
    }

    fetchUsers(): User[]{
        // Fetch all users from database
        const users: User[] = [];

        this.#db.query("SELECT * FROM users WHERE guild_id = ?", [this.id],
            (err, result) => {

            for (let i = 0; i < result.length; i++) {
                const user = result[i];

                users.push (
                    new User(this, user.id, user.points, user.global_points, user.lang, this.#db)
                );
            }

        });

        return users;
    }

    fetchShop(): ShopItem[]{
        // Fetch all shop items from database

        // Since Database is not configured yet, return empty array
        return [];

    }

}