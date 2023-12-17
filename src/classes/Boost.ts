import mysql, {ResultSetHeader} from "mysql2";
import {Guild} from "@/classes/Guild";

export class Boost {
    readonly #db: mysql.Pool;
    #after_timestamp: Date | null; // Only if recurrent is true
    #before_timestamp: Date | null; // Only if recurrent is true
    id: number | null;
    guild: Guild;
    boostType: number;
    appliedId: string;
    multiplier: number;
    startAt: Date;
    endAt: Date;
    recurrent: boolean;
    renewEvery: Date | null; // Only if recurrent is true

    constructor(
        db: mysql.Pool,
        id: number | null,
        guild: Guild,
        boostType: number,
        appliedId: string,
        multiplier: number,
        startAt: Date,
        endAt: Date,
        recurrent: boolean,
        renewEvery: Date | null = null,
        after_timestamp: Date | null = null,
        before_timestamp: Date | null = null
    ) {
        this.#db = db;
        this.id = id;
        this.guild = guild;
        this.boostType = boostType;
        this.appliedId = appliedId;
        this.multiplier = multiplier;
        this.startAt = startAt;
        this.endAt = endAt;
        this.recurrent = recurrent;
        this.renewEvery = renewEvery;
        this.#after_timestamp = after_timestamp;
        this.#before_timestamp = before_timestamp;

        if (this.recurrent) {
            this.updateTimestamps()
        }
    }

    create() {
        this.#db.execute<ResultSetHeader>(
            "INSERT INTO BOOST (guild_id, boost_type, boosted_id, multiplier, starting_at, ending_at, execute_every) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [this.guild.id, this.boostType, this.appliedId, this.multiplier, this.startAt, this.endAt, this.renewEvery],
            (err, result) => {
                if (err) throw err;

                // We are updating the uid of the boost to the one given by the database
                this.id = result.insertId;
            }
        );
    }

    update() {
        this.#db.execute(
            "UPDATE BOOST SET boost_type = ?, boosted_id = ?, multiplier = ?, starting_at = ?, ending_at = ?, execute_every = ?, recurrent = ? WHERE boost_id = ?",
            [this.boostType, this.appliedId, this.multiplier, this.startAt, this.endAt, this.renewEvery, this.id, this.recurrent],
            (err) => {
                if (err) throw err;
            }
        );
    }

    delete(){

        this.#db.execute(
            "DELETE FROM BOOST WHERE boost_id = ?", [this.id], (err) => {
                if (err) throw err;
            });
    }

    updateTimestamps(){

        // after_timestamp & before_timestamp will be updated, so it is a time interval of the next available boost.
        // If you are before those two values, you must wait.
        // If you are between those two values, you can boost.
        // If you are after those two values, you must call that function again to update the timestamps.


        const now = new Date();

        // Represent the time to wait before the next boost is available
        let availableIn = this.renewEvery!.getTime() - (now.getTime() - this.startAt.getTime());

        // If availableIn is negative, it means that the boost is currently available and calling this function was an error
        if (availableIn < 0) throw new Error("Bonus is currently available");

        this.#after_timestamp = new Date(now.getTime() + availableIn);
        this.#before_timestamp = new Date(this.#after_timestamp?.getTime() + this.endAt.getTime())

    }

    getMultiplier(): number {

        if (!this.recurrent) {
            // If we are between the time when the boost starts and the time when the boost ends
            if ( this.startAt.getTime() < new Date().getTime() && this.endAt.getTime() > new Date().getTime()) {
                return this.multiplier;
            }
            else return 1;

        // If our boost is recurrent
        } else {

            // We are checking if we are after the time when the boost ends.
            // In that case, we need to update the timestamps
            if ( this.#before_timestamp!.getTime() < new Date().getTime()) {
                this.updateTimestamps();
            }

            // If we are between the time when the boost starts and the time when the boost ends
            if ( this.#after_timestamp!.getTime() < new Date().getTime() && this.#before_timestamp!.getTime() > new Date().getTime()) {
                return this.multiplier;
            }
            else return 1;
        }
    }

    isActive(): boolean {
        if (!this.recurrent) {
            // If we are between the time when the boost starts and the time when the boost ends
            return this.startAt.getTime() < new Date().getTime() && this.endAt.getTime() > new Date().getTime();

            // If our boost is recurrent
        } else {

            // We are checking if we are after the time when the boost ends.
            // In that case, we need to update the timestamps
            if ( this.#before_timestamp!.getTime() < new Date().getTime()) {
                this.updateTimestamps();
            }

            // If we are between the time when the boost starts and the time when the boost ends
            return this.#after_timestamp!.getTime() < new Date().getTime() && this.#before_timestamp!.getTime() > new Date().getTime();
        }
    }

}
