import short from "short-uuid";
import {Database} from "@/classes/Database";
import {CommandInteraction, EmbedBuilder, WebhookClient} from "discord.js";

console.log(process.env.ERROR_WEBHOOK_URL)
const webhook = new WebhookClient({
    url: process.env.ERROR_WEBHOOK_URL!
})


function bigIntHandler(key: string, value: any) {
    key; // Prevent unused variable warning
    if (typeof value === 'bigint') {
        return value.toString();
    } else {
        return value;
    }
}

export default function (error: Error, db: Database, interaction?: CommandInteraction, asyncErr = false): string {

    let id = short.uuid().toString();

    console.log(`${asyncErr? '/!\\ WARNING /!\\' : ''} [${new Date().toLocaleString("fr-FR")}] Unhandled ${asyncErr? 'async' : ''} error #${id}: ${error.message}`);

    try {
        db.registerError(id, error.name, error.message, error.stack || null, error.cause || null,
            JSON.stringify(
                interaction?.toJSON(),
                bigIntHandler) || null
        );
    } catch (err) {
        // @ts-ignore
        console.log(`[${new Date().toLocaleString()}] Failed to register error #${id}: ${err.message}`);
        id = "couldn't register"
    }

    webhook.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(`Unhandled ${asyncErr? 'async' : ''} error #\`${id}\``)
                .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
                .setColor(0xFF0000)
                .setTimestamp()
        ]
    });

    return id;
}