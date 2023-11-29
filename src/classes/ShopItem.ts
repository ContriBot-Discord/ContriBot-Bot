import { Guild } from "./Guild";

import mysql from "mysql2";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {Text} from "@/classes/Text";
import {User} from "@/classes/User";

export class ShopItem {
  price: number;
  label: string;
  description: string;
  id: number | null | undefined;
  guild: Guild;
  max_quantity: number;
  action: number;
  available: boolean;
  #db: mysql.Connection;
  applied_id: string | null;
  multiplier: number | null;
  boost_type: number | null;
  boost_duration: Date | null;
  texts: Text[] | null;

  constructor(
    db: mysql.Connection,
    price: number,
    label: string,
    description: string,
    id: number | null | undefined,
    guild: Guild,
    max_quantity: number,
    action: number,
    available: boolean,
    applied_id: string | null,
    multiplier: number | null,
    boost_type: number | null,
    boost_duration: Date | null
  ) {
    this.#db = db;                      // The DB connection object
    this.price = price;                 // Price of the item
    this.label = label;                 // Label of the item
    this.description = description;     // Description of the item
    this.id = id;                       // ID of the item (null if not in the database)
    this.guild = guild;                 // Guild of the item
    this.max_quantity = max_quantity;   // Maximum quantity/stock of the item
    this.action = action;               // Action of the item (0: role, 1: boost, 2: text, 3: custom)
    this.available = available;         // Availability of the item (default: true)
    this.applied_id = applied_id;       // ID of the applied item (role, channel, user). If null, the user can choose the target OR the boost target the guild OR it is not a boost item
    this.multiplier = multiplier;                  // Boost multiplier (if action = 1)
    this.boost_type = boost_type;        // Boost type (1 = server, 2 = channel, 3 = role, 4 = user)
    this.boost_duration = boost_duration;// Boost duration (if action = 1)
    this.texts = (action == 2) ? this.fetchTexts() : null; // List of texts (if action = 2
  }

  update(): void {
    // Update the item in the database
    this.#db.query(

        "UPDATE SHOP SET price = ?, label = ?, description = ?, max_quantity = ?, action = ?, available = ?, applied_id = ?, multiplier = ?, boost_type = ? WHERE item_id = ?",
        [
            this.price,
            this.label,
            this.description,
            this.max_quantity,
            this.action,
            this.available,
            this.applied_id,
            this.multiplier,
            this.boost_type,
            this.id,
        ],
        (err) => {
            if (err) throw err;
        }
        );

  }

  create() {
    // Insert a new row in the database
    this.#db.query<ResultSetHeader>(
        "INSERT INTO SHOP (price, label, description, guild_id, max_quantity, action, available, applied_id, multiplier, boost_type, boost_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            this.price,
            this.label,
            this.description,
            this.guild.id,
            this.max_quantity,
            this.action,
            this.available,
            this.applied_id,
            this.multiplier,
            this.boost_type,
            this.boost_duration,
        ],
      (err, result) => {
        if (err) throw err;
        this.id = result.insertId;
      },
    );
  }

  delete(): void {
    // Mark the item as unavailable
    // Removing the row from the database would cause problems with the foreign keys
    // An unavailable item is not displayed in the shop, but still in the inventory
    this.#db.query(
      "UPDATE SHOP SET available = 0 WHERE item_id = ?",
      [this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  addText(text: string[]): void {
      // Add a list of text to the table TEXT

        // Insert the texts in the database in bulk
        this.#db.query(
            "INSERT INTO TEXT (text_id, guild_id, value) VALUES ?",
            [text.map((value) => [this.id, this.guild.id, value])], // For each string in `text`, create an array [this.id, this.guild.id, value]

            (err) => {
                if (err) throw err;

                // Update the list of texts
                text.forEach((value) => {
                    this.texts!.push(new Text(this.#db, this, false, value));
                });
            }
        );
  }

  fetchTexts(): Text[] {
        const texts: Text[] = []

        // Fetch the texts from the database
        this.#db.query<RowDataPacket[]>(
            "SELECT * FROM TEXT WHERE text_id = ? AND guild_id = ?",
            [this.id, this.guild.id],

            (err, results) => {
                if (err) throw err;
                results.forEach((row) => {
                    texts.push(new Text(this.#db, this, row.used, row.value));
                });
            }
        );
        return texts;
  }

  getUnusedTexts(): Text[] | null {
      // Allow to assign a text to a user

        if (this.texts === null) return null;

        const usedTexts: Text[] = [];

        this.texts.forEach((text) => {
            if (!text.used) usedTexts.push(text);
        });

        // If the list is empty (= no texts available), return null
        return usedTexts.length ? usedTexts : null;
  }

    buy(user: User): void {
        // Remove quantity from the item

        // TODO: not updating stocks if item is 2/text
        this.max_quantity -= 1;
        this.update();

        // Add the item to the user's inventory
        user.storePoints -= this.price;
        user.addItem(this);
    }

}
