import {BotEvent} from "@/types";
import {ActionRowBuilder, ButtonBuilder, Events, Interaction,} from "discord.js";

import {DB} from "@/index";
import {User} from "@/classes/User";
import leaderboard from "@/embeds/leaderboard";

import i18next from "i18next";

function getUserList(startingFrom: number, userList: User[], lang: string, pointName: string): { name: string, value: string }[] {

    i18next.changeLanguage(lang)

    const fields: { name: string, value: string }[] = [];

    // We add the n + 10 first users to the embed. If there are less than 10 users, we stop the loop.
    for (let i = startingFrom; i < startingFrom + 10 || i < userList.length; i++) {
        const user = userList[i];

        if (user) {
            fields.push({
                name: ` `,
                value: `**#${i + 1} ·** ` + i18next.t("embeds:leaderboard.fields.value", {
                    userid: user.id,
                    quantity: user.leaderboardPoints,
                    pointName: pointName,
                })
            })
        }
    }
    return fields
}

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!interaction.isButton()) return;

        // If the button is not one of the three buttons, we stop the function since it's not related to the leaderboard
        if (
            !(
                interaction.customId === "previous" ||
                interaction.customId === "next" ||
                interaction.customId === "refresh"
            )
        )
            return;

        // Differing the response allow us to have up to 15 minutes to edit the message, instead of 3 seconds
        await interaction.deferUpdate();

        // We get the actual page number. Used to know which users to display
        const actualPageInt: number = parseInt(
            interaction.message.embeds[0].footer!.text!.split(" ")[1].split("/")[0]
        );


        // We sort the users by their total points
        const guild = DB.getGuild(interaction.guildId!);
        let users = [...guild.users];
        users.sort((a: User, b: User) => b.leaderboardPoints - a.leaderboardPoints);


        // We initialize the fields variable so it can be edited in the if statements
        let fields: { name: string, value: string }[];

        // We get the list of users depending on the button pressed
        if (interaction.customId === "previous") {

            fields = getUserList((actualPageInt - 1) * 10, users, guild.lang, guild.pointName);

        } else if (interaction.customId === "next") {

            fields = getUserList(actualPageInt * 10, users, guild.lang, guild.pointName);

        } else {
            // In case the button is "refresh"
            fields = getUserList((actualPageInt - 1) * 10, users, guild.lang, guild.pointName)
        }

        // we initialize the buttons, and make them disabled if needed
        const button = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId("previous").setLabel("◀︎").setStyle(1)
            )
            .addComponents(
                new ButtonBuilder().setCustomId("next").setLabel("▶").setStyle(1)
            )
            .addComponents(
                new ButtonBuilder().setCustomId("refresh").setLabel("↻").setStyle(1)
            );

        // If the page is 1, we disable the "previous" button
        if (actualPageInt === 1) button.components[0].setDisabled(true);

        // If the page is the last one, we disable the "next" button
        if (actualPageInt === Math.ceil(guild.users.length / 10)) button.components[1].setDisabled(true);

        // We now do generate the embed with all the data we got
        const embed = leaderboard(actualPageInt, Math.ceil(guild.users.length / 10), fields, guild.lang);

        // editReply is required since we used deferUpdate
        await interaction.editReply({embeds: [embed], components: [button]});

    },
};

export default event;
