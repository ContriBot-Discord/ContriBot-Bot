import { Guild } from "./Guild";
import mysql, { RowDataPacket } from "mysql2";

export class Database {
  guilds: Guild[];
  isReady: boolean = false;
  readonly #db: mysql.Connection;

  constructor() {
    // Represent all the guilds in the database
    this.#db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      supportBigNumbers: true,
      bigNumberStrings: true,
    });

    this.#db.connect((err) => {
      if (err) throw err;
      console.log("🗃️ Successfully connected to the database");
    });

    this.guilds = this.fetchGuilds();
  }
  fetchGuilds(): Guild[] {
    // Fetch all the guilds from the database
    let guilds: Guild[] = [];

    // The .query method sends a query to the database
    this.#db.query<RowDataPacket[]>("SELECT * FROM GUILD", (err, result) => {
      if (err) throw err;
      // For each guild in the database, create a new Guild object
      result.forEach((guild: RowDataPacket) => {
        guilds.push(
          new Guild(
            guild.guild_id,
            guild.lang,
            guild.message_point,
            guild.voice_point,
            guild.bump_point,
            guild.boost_point,
            guild.daily_point,
            guild.weekly_point,
            guild.special_point,
            guild.all_time_point,
            guild.point_name,
            guild.log_channel,
            this.#db
          )
        );
      });
    });

    this.isReady = true;
    return guilds;
  }

  getGuild(id: string): Guild {
    // Get a guild from the database
    // If the guild does not exist, create it and return it
    let guild = this.guilds.find((guild) => guild.id == id);

    return !guild ? this.createGuild(id) : guild;
  }

  createGuild(id: string): Guild {
    // Create a guild in the database
    // Since Database is not configured yet, return a new guild
    let guild = new Guild(
      id,
      "en",
      1,
      5,
      10,
      50,
      5,
      10,
      30,
      50,
      "points",
      "0",
      this.#db
    );

    // Register guild in database
    guild.create();

    // Once created, we add the guild to the guilds array
    this.guilds.push(guild);

    return guild;
  }

  registerError(id: string, errorName: string, errorMessage: string, errorStack: string | null, errorCause: {} | null, context: unknown){
        this.#db.query(`INSERT INTO ERROR (error_id, error_name, error_message, error_stack, error_cause, context) VALUE (?, ?, ?, ?, ?, ?)`, [id, errorName, errorMessage, errorStack, JSON.stringify(errorCause), context], (err) => {
            if (err) throw err;
        })

    }
}
