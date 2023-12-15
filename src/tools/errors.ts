import short from "short-uuid";
import {Database} from "@/classes/Database";
import {CommandInteraction} from "discord.js";

function bigIntHandler(key: string, value: any) {
    key; // Prevent unused variable warning
    if (typeof value === 'bigint') {
        return value.toString();
    } else {
        return value;
    }
}

export default function (error: Error, db: Database, interaction?: CommandInteraction): string {

    let id = short.uuid().toString();

    console.log(`[${new Date().toLocaleString()}] Unhandled error #${id}: ${error.message}`);

    try {

        db.registerError(id, error.name, error.message, error.stack || null, error.cause || null,
            JSON.stringify(
                interaction?.toJSON(),
                bigIntHandler)
        );
    } catch (err) {
        // @ts-ignore
        console.log(`[${new Date().toLocaleString()}] Failed to register error #${id}: ${err.message}`);
        id = "couldn't register"
    }

    return id;
}