import mysql from "mysql2";
import {Guild} from "@/classes/Guild";

export class Boost {
    readonly #db: mysql.Connection;
    #after_timestamp: Date | null | undefined; // Only for boost type 5
    #before_timestamp: Date | null | undefined; // Only for boost type 5
    guild: Guild;
    boostType: number;
    appliedId: string;
    boost: number;
    startAt: Date;
    endAt: Date;
    renewEvery: Date | null | undefined; // Only for boost type 5

    constructor(
        db: mysql.Connection,
        guild: Guild,
        boostType: number,
        appliedId: string,
        boost: number,
        startAt: Date,
        endAt: Date,
        renewEvery?: Date | null
    ) {
        this.#db = db;
        this.guild = guild;
        this.boostType = boostType;
        this.appliedId = appliedId;
        this.boost = boost;
        this.startAt = startAt;
        this.endAt = endAt;
        this.renewEvery = renewEvery;

        if (this.boostType === 5) {
            this.updateTimestamps()
        }
    }


    delete(){

        this.#db.execute(
            "DELETE FROM BOOST WHERE boost_type = ? AND boosted_id = ?", [this.boostType, this.appliedId], (err) => {
                if (err) throw err;
            });
    }

    updateTimestamps(){

        // after_timestamp & before_timestamp will be updated so it is a time interval of the next available boost.
        // If you are before thoose two values, you must wait.
        // If you are between thoose two values, you can boost.
        // If you are after thoose two values, you must call that function again to update the timestamps.


        const now = new Date();

        // Represent the time to wait before the next boost is available
        let availableIn = this.renewEvery!.getTime() - (now.getTime() - this.startAt.getTime());

        // If availableIn is negative, it means that the boost is currently available and calling this function was an error
        if (availableIn < 0) throw new Error("Bonus is currently available");

        this.#after_timestamp = new Date(now.getTime() + availableIn);
        this.#before_timestamp = new Date(this.#after_timestamp?.getTime() + this.endAt.getTime())

    }

    getMultiplier(): number {

        if (this.boostType !== 5) {
            // If we are between the time when the boost starts and the time when the boost ends
            if ( this.startAt.getTime() < new Date().getTime() && this.endAt.getTime() > new Date().getTime()) {
                return this.boost;
            }
            else return 1;

        // If boost type is 5, we need to check if the boost is available
        } else {

            // We are checking if we are after the time when the boost ends.
            // In that case, we need to update the timestamps
            if ( this.#before_timestamp!.getTime() < new Date().getTime()) {
                this.updateTimestamps();
            }

            // If we are between the time when the boost starts and the time when the boost ends
            if ( this.#after_timestamp!.getTime() < new Date().getTime() && this.#before_timestamp!.getTime() > new Date().getTime()) {
                return this.boost;
            }
            else return 1;
        }
    }
}
