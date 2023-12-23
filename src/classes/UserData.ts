import mysql, {RowDataPacket} from "mysql2";

export class UserData {
    userID: string
    nextRequest: Date
    data: Record<string, any>[];
    #db: mysql.Pool;

    constructor(db: mysql.Pool, userID: string, nextRequest: Date, data: Record<string, any>[]) {
        this.#db = db;
        this.userID = userID;
        this.nextRequest = nextRequest;
        this.data = data;
    }

    createUserData(): void {
        this.#db.query(
            "INSERT INTO RGPD (userID, nextRequest, data) VALUES (?, ?, ?)",
            [this.userID, this.nextRequest, JSON.stringify(this.data)],
            (err) => {
                if (err) throw err;
            }
        );
    }

    retrieveUserData(callback: (data: Record<string, any>[], nextRequest: Date) => void): void {
        if (this.nextRequest.getTime() <= Date.now()) {
            this.#db.query(`
                UPDATE RGPD
                SET nextRequest = DATE_ADD(now(), INTERVAL 1 MONTH),
                    data        = (SELECT JSON_ARRAYAGG(
                                                  JSON_OBJECT(
                                                          'guild_id', U.guild_id,
                                                          'store_points', U.store_points,
                                                          'leaderboard_points', U.leaderboard_points,
                                                          'message_sent', U.messages_sent,
                                                          'voice_duration', U.voice_duration,
                                                          'bump_points', U.bump_points,
                                                          'nitro_boost_points', U.nitro_boost_points,
                                                          'inventory', (SELECT JSON_ARRAYAGG(
                                                                                       JSON_OBJECT(
                                                                                               'id', I.id,
                                                                                               'user_id', I.user_id,
                                                                                               'guild_id', I.guild_id,
                                                                                               'item_id', I.item_id,
                                                                                               'item_name', I.item_name,
                                                                                               'purchase_date',
                                                                                               I.purchase_date,
                                                                                               'purchase_price',
                                                                                               I.purchase_price,
                                                                                               'used', I.used,
                                                                                               'refunded', I.refunded,
                                                                                               'item_type', I.item_type,
                                                                                               'text_value',
                                                                                               I.text_value,
                                                                                               'boost_multiplier',
                                                                                               I.boost_multiplier,
                                                                                               'boost_duration',
                                                                                               I.boost_duration,
                                                                                               'boost_type',
                                                                                               I.boost_type,
                                                                                               'applied_id',
                                                                                               I.applied_id
                                                                                       )
                                                                               )
                                                                        FROM INVENTORY I
                                                                        WHERE I.user_id = U.user_id
                                                                          AND I.guild_id = U.guild_id)
                                                  )
                                          )
                                   FROM USER U
                                   WHERE U.user_id = ?)
                WHERE userID = ?;
            `, [this.userID, this.userID], (err) => {
                if (err) throw err;

                this.#db.query<RowDataPacket[]>(
                    "SELECT nextRequest, data FROM RGPD WHERE userID = ?", [this.userID],
                    (err, result) => {
                        if (err) throw err;

                        this.nextRequest = result[0].nextRequest;
                        this.data = result[0].data;

                        callback(this.data, this.nextRequest);
                    });
            });

        } else {
            callback(this.data, this.nextRequest);
        }
    }


}