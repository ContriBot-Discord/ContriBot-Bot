import { Guild } from "./Guild";
import { UserItem } from "./UserItem";
import mysql, { RowDataPacket } from "mysql2";
import { ShopItem } from "@/classes/ShopItem";

export class User {
  guild: Guild;
  id: string;
  storePoints: number;
  leaderboardPoints: number;
  messagesSent: number;
  voiceDuration: number;
  bumpCount: number;
  inventory: UserItem[];
  readonly #db: mysql.Pool;
  voiceJoinedAt: Date | null;

  constructor(
    guild: Guild,
    id: string,
    storePoints: number = 0,
    leaderboardPoints: number = 0,
    messagesSent: number = 0,
    voiceDuration: number = 0,
    bumpCount: number = 0,
    db: mysql.Pool
  ) {
    this.#db = db;
    this.guild = guild;
    this.id = id;
    this.storePoints = storePoints;
    this.leaderboardPoints = leaderboardPoints;
    this.messagesSent = messagesSent;
    this.voiceDuration = voiceDuration;
    this.bumpCount = bumpCount;
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
              this.#db,
              Number(item.id),
              this,
              this.guild,
              this.guild.getShopItem(item.item_id)!,
              item.item_name,
              item.purchase_date,
              item.purchase_price,
              item.used,
              item.refunded,
              item.item_type,
              item.text_value,
              item.boost_multiplier,
              item.boost_duration,
              item.boost_type,
              item.applied_id
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
      "INSERT INTO USER (user_id, guild_id, store_points, leaderboard_points, messages_sent, voice_duration, bump_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        this.id,
        this.guild.id,
        this.storePoints,
        this.leaderboardPoints,
        this.messagesSent,
        this.voiceDuration,
        this.bumpCount,
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
      "UPDATE USER SET store_points = ?, leaderboard_points = ?, messages_sent = ?, voice_duration = ?, bump_count = ? WHERE user_id = ? AND guild_id = ?",
      [
        this.storePoints,
        this.leaderboardPoints,
        this.messagesSent,
        this.voiceDuration,
        this.bumpCount,
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

  getItemsByDate(date: Date): UserItem[] {
    // Get all items bought after a date
    return this.inventory.filter((item) => item.purchaseDate >= date);
  }

  getItemsById(id: number, date: undefined |  Date = undefined): UserItem[] {
    // Get all items with a specific id
    return date === undefined
      ? this.inventory.filter((item) => item.id! === id)
      : this.getItemsByDate(date).filter((item) => item.id! === id);
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

    const points: number = this.guild.getMultiplier(roles);

    this.messagesSent += 1;
    this.addPoints(points);
  }

  addItem(item: ShopItem, callback? : (userItem: UserItem) => void): UserItem {
    // Callback invoked when the item is registered in the database
    const userItem = new UserItem(
        this.#db,
        null,
        this,
        this.guild,
        item,
        item.label,
        new Date(),
        item.price,
        false,
        false,
        item.action,
        null,
        null,
        null,
        null,
        null
        );

    userItem.create(callback);
    this.inventory.push(userItem);

    return userItem;
  }
}
