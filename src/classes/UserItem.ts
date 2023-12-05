import mysql, {ResultSetHeader} from "mysql2";
import {Guild} from "@/classes/Guild";
import {User} from "@/classes/User";
import {ShopItem} from "@/classes/ShopItem";
import {Boost} from "@/classes/Boost";

export class UserItem {
    readonly #db: mysql.Connection;
    id: number | null;
    user: User;
    guild: Guild;
    item: ShopItem;
    itemName: string;
    purchaseDate: Date;
    purchasePrice: number;
    used: boolean;
    refunded: boolean;
    itemType: number;
    textValue: string | null;
    boostMultiplier: number | null;
    boostDuration: Date | null;
    boostType: number | null;
    appliedId: string | null;

    constructor(
        db: mysql.Connection,
        id: number | null,
        user: User,
        guild: Guild,
        item: ShopItem,
        itemName: string,
        purchaseDate: Date,
        purchasePrice: number,
        used: boolean,
        refunded: boolean,
        itemType: number,  // Action of the item (0: role, 1: boost, 2: text, 3: custom)
        textValue: string | null,
        boostMultiplier: number | null,
        boostDuration: Date | null,
        boostType: number | null,
        appliedId: string | null
    ) {
        this.#db = db;
        this.id = id;
        this.user = user;
        this.guild = guild;
        this.item = item;
        this.itemName = itemName;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
        this.used = used;
        this.refunded = refunded;
        this.itemType = itemType;
        this.textValue = textValue;
        this.boostMultiplier = boostMultiplier;
        this.boostDuration = boostDuration;
        this.boostType = boostType;
        this.appliedId = appliedId;
    }

    create(callback?: (userItem: UserItem) => void) {
        this.#db.execute<ResultSetHeader>(
            "INSERT INTO INVENTORY (user_id, guild_id, item_id, item_name, purchase_date, purchase_price, used, refunded, item_type, text_value, boost_multiplier, boost_duration, boost_type, applied_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [this.user.id, this.guild.id, this.item.id, this.itemName, this.purchaseDate, this.purchasePrice, this.used, this.refunded, this.itemType, this.textValue, this.boostMultiplier, this.boostDuration, this.boostType, this.appliedId],
            (err, result) => {
                if (err) throw err;

                this.id = result.insertId;
                if (callback) callback(this);
            }
        );
    }

    update() {
        this.#db.execute(
            "UPDATE INVENTORY SET user_id = ?, guild_id = ?, item_id = ?, item_name = ?, purchase_date = ?, purchase_price = ?, used = ?, refunded = ?, item_type = ?, text_value = ?, boost_multiplier = ?, boost_duration = ?, boost_type = ?, applied_id = ? WHERE id = ?",
            [this.user.id, this.guild.id, this.item.id, this.itemName, this.purchaseDate, this.purchasePrice, this.used, this.refunded, this.itemType, this.textValue, this.boostMultiplier, this.boostDuration, this.boostType, this.appliedId, this.id],
            (err) => {
                if (err) throw err;
            }
        );
    }

    delete() {
        this.#db.execute(
            "DELETE FROM INVENTORY WHERE id = ?", [this.id], (err) => {
                if (err) throw err;
            }
        );
    }

    toBoost(): Boost {
        return new Boost(
            this.#db,
            this.id,
            this.guild,
            this.boostType!,
            this.appliedId!,
            this.boostMultiplier!,
            this.purchaseDate,
            new Date(this.boostDuration!.getTime() + this.purchaseDate.getTime()),
            false
        )
    }
}