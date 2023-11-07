import { User } from "./User";
import { ShopItem } from "./ShopItem";
import mysql, { RowDataPacket } from "mysql2";
import { UserItem } from "@/classes/UserItem";

export class Guild {
  id: string;
  lang: string;
  users: User[];
  shop: ShopItem[];
  globalInventory: UserItem[];
  readonly #db: mysql.Connection;

  constructor(id: string, lang: string, db: mysql.Connection) {
    this.#db = db;
    this.id = id;
    this.lang = lang;
    this.shop = this.fetchShop();
    this.users = this.fetchUsers();
    // Represent a list with all the items bought by all the users
    // We will merge all the inventories of all the users in this list
    this.globalInventory = this.users.map((user) => user.inventory).flat();
  }

  getUser(id: string): User {
    // Get a user from the database
    // If the user does not exist, create it and return it
    let user = this.users.find((user) => user.id == id);

    return !user ? this.createUser(id) : user;
  }

  createUser(id: string): User {
    // Create a guild in the database
    // Since Database is not configured yet, return a new guild
    let user = new User(this, id, 0, 0, this.#db);

    // Insert a new row in the database
    user.create();

    // Once created, we add the user to the guilds array
    this.users.push(user);

    return user;
  }

  create(): void {
    // Insert a new row in the database
    this.#db.query<RowDataPacket[]>(
      "INSERT INTO GUILD (guild_id, lang) VALUES (?, ?)",
      [this.id, this.lang],
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  update(): void {
    // Update guild in database
    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET lang = ? WHERE guild_id = ?",
      [this.lang, this.id],
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  fetchUsers(): User[] {
    // Fetch all users from database
    const users: User[] = [];

    this.#db.execute<RowDataPacket[]>(
      "SELECT * FROM USER WHERE guild_id = ?",
      [this.id],
      (err, result) => {
        if (err) throw err;

        result.forEach((user: any) => {
          users.push(
            new User(
              this,
              user.user_id,
              user.storePoints,
              user.leaderboardPoints,
              this.#db
            )
          );
        });
      }
    );

    return users;
  }

  resetPoints(): void {
    // Reset all users' points in database
    this.#db.query<RowDataPacket[]>(
      "UPDATE USER SET store_points = 0, leaderboard_points = 0  WHERE guild_id = ?",
      [this.id],
      (err, result) => {
        if (err) throw err;
      }
    );

    // We now update the cache
    this.users.forEach((user) => {
      user.storePoints = 0;
      user.leaderboardPoints = 0;
    });
  }

  fetchShop(): ShopItem[] {
    // Fetch all shop items from database
    const shop: ShopItem[] = [];

    this.#db.execute<RowDataPacket[]>(
      "SELECT * FROM SHOP WHERE guild_id = ?",
      [this.id],
      (err, result) => {
        if (err) throw err;

        result.forEach((item: any) => {
          shop.push(
            new ShopItem(
              item.price,
              item.name,
              item.description,
              item.id,
              this,
              item.max_quantity,
              item.action,
              item.available,
              item.available_after,
              item.available_before,
              item.restock_duration,
              this.#db
            )
          );
        });
      }
    );

    return shop;
  }

  setLang(lang: string) {
    this.lang = lang;
    this.update();
  }

  getItemByDate(date: Date | undefined): UserItem[] {
    // Get All items bought after a date
    if (date === undefined) {
      date = new Date(0);
    }

    return this.globalInventory.filter((item) => item.boughtAt >= date!);
  }

  getItemById(id: string, date: undefined | Date = undefined): UserItem[] {
    // Return a list, bought before a date (default: Ignore date) with specific id

    // if date is undefined, we set it to the 1st January 1970
    if (date === undefined) {
      date = new Date(0);
    }

    // Get all items bought before a date
    const items = this.getItemByDate(date);

    // Return the list of items with the id
    return items.filter((item) => item.id === id);
  }
}
