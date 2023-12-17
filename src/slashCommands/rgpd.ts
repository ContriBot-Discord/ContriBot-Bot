import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

export const command: SlashCommand = {
    name: "rgpd",
    data: new SlashCommandBuilder()
        .setName("rgpd")
        .setDescription("Displays the bot's ping"),
    execute: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply({ ephemeral: true });

        DB.getRgpd(interaction.user.id, (data: Record<string, any>[], nextRequest: Date) => {
            interaction.editReply({
                content: `Here is your data. You can download it by clicking on the file below.\n The data will not be updated until <t:${nextRequest.getTime()/1000}:T>`,
                files: [
                    {
                        attachment: Buffer.from(JSON.stringify(data, null, 2)),
                        name: "data.json",
                        spoiler: true,
                        description: "The data you requested, in JSON format"
                    }
                ]
            });
        })
    }
};
