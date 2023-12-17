import {ShopItem} from "@/classes/ShopItem";
import mysql from "mysql2";

export class Text{

    #db: mysql.Pool;
    item: ShopItem;
    used: boolean
    content: string;

    constructor(db: mysql.Pool, item: ShopItem, used: boolean, content: string) {
        this.#db = db;
        this.item = item;
        this.used = used;
        this.content = content;
    }

    use(used: boolean = true): void {
        this.#db.query(
            "UPDATE TEXT SET used = ? WHERE text_id = ? AND guild_id = ? AND value = ? AND used = ? LIMIT 1",
            [
                used,
                this.item.id,
                this.item.guild.id,
                this.content,
                !used
            ],
            (err: mysql.QueryError | null) => {
                if (err) throw err;
                this.used = used;
            }
        );
    }

}