import { User } from "./User";
import {ShopItem} from "@/classes/ShopItem";
import mysql from 'mysql';

export class Guild{
    id: string;
    lang: string;
    users: User[];
    shop: ShopItem[];
    readonly #db: mysql.Connection;

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

        if (user === undefined) {
            user = this.createUser(id);
        }

        return user
    }

    createUser(id: string): User{

        // Create a guild in the database
        // Since Database is not configured yet, return a new guild
        let user = new User(this, id, 0, 0, this.#db);

        // Insert a new row in the database
        user.create();

        // Once created, we add the user to the guilds array
        this.users.push(user);

        // And return it
        return user;

    }

    create(): void{
        // Insert a new row in the database

        // We do ignore a warning here because we don't need to do anything with the result
        // noinspection JSUnusedLocalSymbols
        this.#db.query("INSERT INTO GUILD (guild_id, lang) VALUES (?, ?)", [this.id, this.lang],
            (err, result) => {
                if (err) throw err;
            })

    }

    update(): void{
        // Update guild in database

        // We do ignore a warning here because we don't need to do anything with the result
        // noinspection JSUnusedLocalSymbols
        this.#db.query("UPDATE GUILD SET lang = ? WHERE guild_id = ?", [this.lang, this.id],
            (err, result) => {
                if (err) throw err;
            });
    }

    fetchUsers(): User[]{
        // Fetch all users from database
        const users: User[] = [];

        this.#db.query("SELECT * FROM USER WHERE guild_id = ?", [this.id],
            (err, result) => {

            for (let i = 0; i < result.length; i++) {
                const user = result[i];

                users.push (
                    new User(this, user.id, user.points, user.global_points, this.#db)
                );
            }

        });

        return users;
    }

    resetPoints(): void{

        // Reset all users' points in database

        // We do ignore a warning here because we don't need to do anything with the result
        // noinspection JSUnusedLocalSymbols
        this.#db.query("UPDATE USER SET points = 0, global_points = 0  WHERE guild_id = ?", [this.id],
            (err, result) => {
                if (err) throw err;
            });

        // We now update the cache
        this.users.forEach(user => {
            user.points = 0;
            user.allPoints = 0;
        });
    }



    fetchShop(): ShopItem[]{
        // Fetch all shop items from database

        // Since Database is not configured yet, return empty array
        return [];

    }

    setLang(lang: string) {

        this.lang = lang;
        this.update();

    }
}