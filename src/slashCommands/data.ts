import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { SlashCommand } from "@/types";

import { DB } from "@/index";

export const command: SlashCommand = {
    name: "data",
    data: new SlashCommandBuilder()
        .setName("data")
        .setDescription("Get all the data I have about you"),
    execute: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply({ ephemeral: true });

        // TODO: Allow localisation here

        DB.getRgpd(interaction.user.id, (data: Record<string, any>[], nextRequest: Date) => {
            interaction.editReply({
                content: `Here is all the stuff I found about you on my sticky notes all over my computer !\n This data will not be updated again until the <t:${nextRequest.getTime()/1000}:D>.`,
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
