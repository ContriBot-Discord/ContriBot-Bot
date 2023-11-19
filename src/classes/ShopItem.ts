import { Guild } from "./Guild";

import mysql from "mysql2";
import {ResultSetHeader} from "mysql2";

export class ShopItem {
  price: number;
  name: string;
  description: string;
  id: number | null | undefined;
  guild: Guild;
  max_quantity: number;
  action: number;
  available: boolean;
  #db: mysql.Connection;

  constructor(
    db: mysql.Connection,
    price: number,
    name: string,
    description: string,
    id: number | null | undefined,
    guild: Guild,
    max_quantity: number,
    action: number,
    available: boolean,
  ) {
    this.#db = db;
    this.price = price;
    this.name = name;
    this.description = description;
    this.id = id;
    this.guild = guild;
    this.max_quantity = max_quantity;
    this.action = action;
    this.available = available;
  }

  update(): void {
    // Update the item in the database
    this.#db.query(
      "UPDATE SHOP SET price = ?, label = ?, description = ?, max_quantity = ?, action = ?, available = ? WHERE item_id = ?",
      [
        this.price,
        this.name,
        this.description,
        this.max_quantity,
        this.action,
        this.available,
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
      "INSERT INTO SHOP (guild_id, price, label, description, max_quantity, action, available) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        this.guild.id,
        this.price,
        this.name,
        this.description,
        this.max_quantity,
        this.action,
        this.available,
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
}
