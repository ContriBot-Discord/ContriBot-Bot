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

        DB.getRgpd(interaction.user.id, async (data: Record<string, any>[], nextRequest: Date) => {

            const striginfiedData = JSON.stringify(data, null, 2);
            try {
                await interaction.user.send({
                    content: `Here is all the stuff I found about you on my sticky notes all over my computer !\nThis data will not be updated again until the <t:${Math.ceil(nextRequest.getTime()/1000)}:D>.`,
                    files: [
                        {
                            attachment: Buffer.from(striginfiedData),
                            name: "SPOILER_data.json",
                            description: "The data you requested, in JSON format"
                        }]
                });

                await interaction.editReply("The requested data has been sent to you in DMs !");
            } catch (error) {
                await interaction.editReply({
                    content: `**Could not send you the data in DMs.**\nHere is all the stuff I found about you on my sticky notes all over my computer !\nThis data will not be updated again until the <t:${nextRequest.getTime()/1000}:D>.`,
                    files: [
                        {
                            attachment: Buffer.from(striginfiedData),
                            name: "data.json",
                            spoiler: true,
                            description: "The data you requested, in JSON format"
                        }]
                });
            }
        })
    }
};
