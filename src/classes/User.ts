import { Guild } from "./Guild";
import { UserItem } from "./UserItem";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2";
import { ShopItem } from "@/classes/ShopItem";

export class User {
  guild: Guild;
  id: string;
  storePoints: number;
  leaderboardPoints: number;
  messagesSent: number;
  voiceDuration: number;
  inventory: UserItem[];
  readonly #db: mysql.Connection;
  voiceJoinedAt: Date | null;

  constructor(
    guild: Guild,
    id: string,
    storePoints: number = 0,
    leaderboardPoints: number = 0,
    messagesSent: number = 0,
    voiceDuration: number = 0,
    db: mysql.Connection
  ) {
    this.#db = db;
    this.guild = guild;
    this.id = id;
    this.storePoints = storePoints;
    this.leaderboardPoints = leaderboardPoints;
    this.messagesSent = messagesSent;
    this.voiceDuration = voiceDuration;
    this.inventory = this.fetchInventory();
    this.voiceJoinedAt = null;
  }

  fetchInventory(): UserItem[] {
    // Fetch all items from database
    const items: UserItem[] = [];

    // Join the inventory and the shop to get the name and description
    this.#db.query<RowDataPacket[]>(
      "SELECT * FROM INVENTORY INNER JOIN SHOP ON INVENTORY.item_id = SHOP.item_id WHERE user_id = ? AND SHOP.guild_id = ?",
      [this.id, this.guild.id],
      (err, result) => {
        if (err) throw err;

        result.forEach((item: RowDataPacket) => {
          items.push(
            new UserItem(
              this,
              item.id,
              item.name,
              item.description,
              item.boughtAt,
              item.refunded,
              item.refundedAt,
              item.used,
              item.usedAt,
              this.#db
            )
          );
        });
      }
    );
    return items;
  }

  create(): void {
    // Register user in database
    this.#db.query<RowDataPacket[]>(
      "INSERT INTO USER (user_id, guild_id, store_points, leaderboard_points, messages_sent, voice_duration) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.id,
        this.guild.id,
        this.storePoints,
        this.leaderboardPoints,
        this.messagesSent,
        this.voiceDuration,
      ],

      (err) => {
        if (err) throw err;
      }
    );
  }

  update(): void {
    // Update user in database
    // This should send all the data to the database

    // If the user exists in the database, it gets updated. If not, it gets created
    this.#db.query(
      "UPDATE USER SET store_points = ?, leaderboard_points = ?, messages_sent = ?, voice_duration = ? WHERE user_id = ? AND guild_id = ?",
      [
        this.storePoints,
        this.leaderboardPoints,
        this.messagesSent,
        this.voiceDuration,
        this.id,
        this.guild.id,
      ],

      (err) => {
        if (err) throw err;
      }
    );
  }

  setPoints(amount: number, scope: string = "both"): void {
    // Set points to user
    if (scope === "both" || scope === "storePoints") this.storePoints = amount;
    if (scope === "both" || scope === "leaderboardPoints")
      this.leaderboardPoints = amount;
    this.update();
  }

  addPoints(amount: number = 1, scope: string = "both"): void {
    // Add points to user
    if (scope === "both" || scope === "storePoints") this.storePoints += amount;
    if (scope === "both" || scope === "leaderboardPoints")
      this.leaderboardPoints += amount;
    this.update();
  }

  getPoints(scope: string = "storePoints"): number {
    return Math.floor(
      scope === "leaderboardPoints" ? this.leaderboardPoints : this.storePoints
    );
  }

  buyItem(item: ShopItem): void {
    // All the verification should be done BEFORE calling this method.
    // No verification is done here.
    // Points should be removed from the user before calling this method.

    let itemId;

    // Create a new item in the database
    this.#db.query<ResultSetHeader>(
      "INSERT INTO INVENTORY (item_id, user_id, guild_id) VALUES (?, ?, ?)",
      [item.id, this.id, this.guild.id],
      (err, result) => {
        if (err) throw err;

        itemId = result.insertId; // We get the id of the item we just created
      }
    );

    // Create a new UserItem object
    const userItem = new UserItem(
      this,
      itemId!.toString(),
      item.name,
      item.description,
      new Date(),
      false,
      new Date(),
      false,
      new Date(),
      this.#db
    );

    // Add the item to the inventory
    this.inventory.push(userItem);
  }

  getItemsByDate(date: Date): UserItem[] {
    // Get all items bought after a date
    return this.inventory.filter((item) => item.boughtAt >= date);
  }

  getItemsById(id: string, date: undefined | Date = undefined): UserItem[] {
    // Get all items with a specific id
    return date === undefined
      ? this.inventory.filter((item) => item.id === id)
      : this.getItemsByDate(date).filter((item) => item.id === id);
  }

  addVoicePoint(duration: number, channelId: string, roles: string[]): void {
    roles.push(channelId, this.guild.id, this.id);

    // Divide by 1000 to convert in seconds, then by 60 to convert in minutes, then by 15 to convert in 15 minutes
    const points: number =
      (duration / 900000) * this.guild.getMultiplier(roles);

    this.voiceDuration += duration;
    this.addPoints(this.guild.voicePoint * points);
  }

  addMessagePoint(channelId: string, roles: string[]): void {
    roles.push(channelId, this.guild.id, this.id);

    const points: number = 1 * this.guild.getMultiplier(roles);

    this.messagesSent += 1;
    this.addPoints(points);
  }
}
