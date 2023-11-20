import { Guild } from "./Guild";

import mysql from "mysql2";
import {ResultSetHeader} from "mysql2";

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

  create(): void {
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
      }
    );
  }

  delete(): void {
    // Delete the item from the database
    this.#db.query(
      "DELETE FROM SHOP WHERE item_id = ?",
      [this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  addText(text: string[]): void {
      // Add a list of text to the table TEXT

      const values = text.map((t) => [this.id, this.guild.id, t]);


      this.#db.query(
          "INSERT INTO TEXT (text_id, guild_id, value) VALUES ?",
          [values],
          (err) => {
              if (err) throw err;
          });

  }

}
