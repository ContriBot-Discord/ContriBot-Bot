import {User} from "@/classes/User";
import mysql from "mysql";

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
        // Update item in database
        // This should send all the data to the database
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