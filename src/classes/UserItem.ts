import {User} from "./User";
import mysql from "mysql";


// Represents an item in the inventory of a user.
// The id is the unique_item_id in the database
export class UserItem {
    user: User;
    id: string;
    name: string;
    description: string;
    boughtAt: Date;
    refunded: boolean;
    refundedAt: Date;
    used: boolean;
    usedAt: Date;
    #db: mysql.Connection;

    constructor(
        user: User,
        id: string,
        name: string,
        description: string,
        boughtAt: Date,
        refunded: boolean = false,
        refundedAt: Date = new Date(),
        used: boolean = false,
        usedAt: Date = new Date(),
        db: mysql.Connection
    ){
        this.user = user;
        this.id = id;
        this.name = name;
        this.description = description;
        this.boughtAt = boughtAt;
        this.refunded = refunded;
        this.refundedAt = refundedAt;
        this.used = used;
        this.usedAt = usedAt;
        this.#db = db;
    }

    update(): void{

        this.#db.query("UPDATE INVENTORY SET refunded = ?, refunded_at = ?, used = ?, used_at = ? WHERE unique_item_id = ?",
            [this.refunded, this.refundedAt, this.used, this.usedAt, this.id],
            (err, result) => {
                if (err) throw err;
            });
    }

    refund(): void{

        // Check if item is already refunded
        if(this.refunded){
            throw new Error("UserItem is already refunded");
        } else {
            this.refunded = true;
            this.refundedAt = new Date();

            this.update();
        }

    }

}