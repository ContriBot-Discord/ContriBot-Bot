import {Guild} from "@/classes/Guild";

import mysql from "mysql";

export class ShopItem{
    price: number;
    name: string;
    description: string;
    id: string;
    guild: Guild;
    max_quantity: number;
    action: number;
    available: boolean;
    availableAfter: Date;
    availableBefore: Date;
    restockDuration: number;
    #db: mysql.Connection;

    constructor(
        price: number,
        name: string,
        description: string,
        id: string,
        guild: Guild,
        max_quantity: number,
        action: number,
        available: boolean,
        availableAfter: Date,
        availableBefore: Date,
        restockDuration: number,
        db: mysql.Connection
    ){
        this.price = price;
        this.name = name;
        this.description = description;
        this.id = id;
        this.guild = guild;
        this.max_quantity = max_quantity;
        this.action = action;
        this.available = available;
        this.availableAfter = availableAfter;
        this.availableBefore = availableBefore;
        this.restockDuration = restockDuration;
        this.#db = db;
    }

    update(): void{
        // Update the item in the database

        this.#db.query(
            "UPDATE SHOP SET price = ?, label = ?, description = ?, max_quantity = ?, action = ?, available = ?, available_after = ?, available_before = ?, restock_duration = ? WHERE item_id = ?",
            [this.price, this.name, this.description, this.max_quantity, this.action, this.available, this.availableAfter, this.availableBefore, this.restockDuration, this.id],
            (err, result) => {
                if (err) throw err;
            }
        )

    }

    create(): void{

        // Insert a new row in the database
        this.#db.query(
            "INSERT INTO SHOP (item_id, guild_id, price, label, description, max_quantity, action, available, available_after, available_before, restock_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [this.id, this.guild.id, this.price, this.name, this.description, this.max_quantity, this.action, this.available, this.availableAfter, this.availableBefore, this.restockDuration],
            (err, result) => {
                if (err) throw err;
            }
        )

    }

    delete(): void{

        // Delete the item from the database
        this.#db.query(
            "DELETE FROM SHOP WHERE item_id = ?",
            [this.id],
            (err, result) => {
                if (err) throw err;
            }
        )

    }


}