import { User } from "./User";
import { ShopItem } from "./ShopItem";
import mysql, { RowDataPacket } from "mysql2";
import { UserItem } from "@/classes/UserItem";
import { Boost } from "@/classes/Boost";

export class Guild {
  id: string;
  lang: string;
  messagePoint: number;
  vocalPoint: number;
  bumpPoint: number;
  boostPoint: number;
  dailyPoint: number;
  weeklyPoint: number;
  specialPoint: number;
  allTimePoint: number;
  pointName: string;
  users: User[];
  shop: ShopItem[];
  globalInventory: UserItem[];
  disabledChannels: string[];
  readonly #db: mysql.Connection;
  private boosts: Boost[];

  constructor(
    id: string,
    lang: string,
    messagePoint: number,
    vocalPoint: number,
    bumpPoint: number,
    boostPoint: number,
    dailyPoint: number,
    weeklyPoint: number,
    specialPoint: number,
    allTimePoint: number,
    pointName: string,
    db: mysql.Connection
  ) {
    this.#db = db;
    this.id = id;
    this.lang = lang;
    this.messagePoint = messagePoint;
    this.vocalPoint = vocalPoint;
    this.bumpPoint = bumpPoint;
    this.boostPoint = boostPoint;
    this.dailyPoint = dailyPoint;
    this.weeklyPoint = weeklyPoint;
    this.specialPoint = specialPoint;
    this.allTimePoint = allTimePoint;
    this.pointName = pointName;
    this.shop = this.fetchShop();
    this.users = this.fetchUsers();
    // Represent a list with all the items bought by all the users
    // We will merge all the inventories of all the users in this list
    this.globalInventory = this.users.map((user) => user.inventory).flat();
    this.disabledChannels = this.fetchDisabledChannels();
    this.boosts = this.fetchBoosters();
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
              user.store_points,
              user.leaderboard_points,
              this.#db
            )
          );
        });
      }
    );

    return users;
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
      "INSERT INTO GUILD (guild_id, message_point, vocal_point, bump_point, boost_point, daily_point, weekly_point, special_point, all_time_point, point_name, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.id,
        this.messagePoint,
        this.vocalPoint,
        this.bumpPoint,
        this.boostPoint,
        this.dailyPoint,
        this.weeklyPoint,
        this.specialPoint,
        this.allTimePoint,
        this.pointName,
        this.lang,
      ],
      (err) => {
        if (err) throw err;
      }
    );
  }

  resetPoints(scope: string = "both"): void {
    let req: string;

    // We choose the request depending on the scope
    switch (scope) {
      case "storePoints":
        req = "UPDATE USER SET store_points = 0 WHERE guild_id = ?";
        break;
      case "leaderboardPoints":
        req = "UPDATE USER SET leaderboard_points = 0 WHERE guild_id = ?";
        break;
      default:
        req =
          "UPDATE USER SET store_points = 0, leaderboard_points = 0  WHERE guild_id = ?";
        break;
    }

    // Reset all users' points in database
    this.#db.query<RowDataPacket[]>(req, [this.id], (err) => {
      if (err) throw err;
    });

    // We now update the cache
    this.users.forEach((user) => {
      if (scope === "both" || scope === "storePoints") user.storePoints = 0;
      if (scope === "both" || scope === "leaderboardPoints")
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

  setLang(lang: string) {
    this.lang = lang;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET lang = ? WHERE guild_id = ?",
      [lang, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  setPointName(pointName: string) {
    this.pointName = pointName;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET point_name = ? WHERE guild_id = ?",
      [pointName, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  fetchDisabledChannels(): string[] {
    // Fetch all disabled channels from database
    const disabledChannels: string[] = [];

    this.#db.execute<RowDataPacket[]>(
      "SELECT * FROM DISABLED_CHANNEL WHERE guild_id = ?",
      [this.id],
      (err, result) => {
        if (err) throw err;

        result.forEach((channel: any) => {
          disabledChannels.push(channel.channel_id);
        });
      }
    );

    return disabledChannels;
  }

  addDisabledChannel(channelId: string) {
    this.disabledChannels.push(channelId);

    this.#db.query<RowDataPacket[]>(
      "INSERT INTO DISABLED_CHANNEL (guild_id, channel_id) VALUES (?, ?)",
      [this.id, channelId],
      (err) => {
        if (err) throw err;
      }
    );
  }

  removeDisabledChannel(channelId: string) {
    this.disabledChannels = this.disabledChannels.filter(
      (channel) => channel !== channelId
    );

    this.#db.query<RowDataPacket[]>(
      "DELETE FROM DISABLED_CHANNEL WHERE guild_id = ? AND channel_id = ?",
      [this.id, channelId],
      (err) => {
        if (err) throw err;
      }
    );
  }

  fetchBoosters(): Boost[] {
    // Fetch all boosters from database
    const boosters: Boost[] = [];

    this.#db.execute<RowDataPacket[]>(
      "SELECT * FROM BOOST WHERE guild_id = ?",
      [this.id],
      (err, result) => {
        if (err) throw err;

        result.forEach((booster: any) => {
          boosters.push(
            new Boost(
              this.#db,
              booster.boost_id,
              this,
              booster.boost_type,
              booster.boosted_id,
              booster.multiplier,
              booster.starting_at,
              booster.ending_at,
              booster.execute_every,
              booster.recurrent
            )
          );
        });
      }
    );
    return boosters;
  }

  getMultiplier(IDs: string[]): number {
    let multiplier = 1;
    this.boosts.forEach((boost) => {
      if (IDs.includes(boost.appliedId)) {
        multiplier *= boost.getMultiplier();
      }
    });
    return multiplier;
  }

  setActionPoint(action: string, point: number): void {
    switch (action) {
      case "message":
        this.setMessagePoint(point);
        break;
      case "react":
        this.setVocalPoint(point);
        break;
      case "voice":
        this.setVocalPoint(point);
        break;
      case "bump":
        this.setBumpPoint(point);
        break;
      case "boost":
        this.setBoostPoint(point);
        break;
      default:
        break;
    }

  }

  setMessagePoint(point: number): void {
    this.messagePoint = point;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET message_point = ? WHERE guild_id = ?",
      [point, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  setVocalPoint(point: number): void {
    this.vocalPoint = point;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET vocal_point = ? WHERE guild_id = ?",
      [point, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  setBumpPoint(point: number): void {
    this.bumpPoint = point;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET bump_point = ? WHERE guild_id = ?",
      [point, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }

  setBoostPoint(point: number): void {
    this.boostPoint = point;

    this.#db.query<RowDataPacket[]>(
      "UPDATE GUILD SET boost_point = ? WHERE guild_id = ?",
      [point, this.id],
      (err) => {
        if (err) throw err;
      }
    );
  }
}
