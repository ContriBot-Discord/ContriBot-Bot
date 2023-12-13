import itemNotFound from "@embeds/errors/items/itemNotFound";
import buyShopLogEmbed from "@embeds/logs/shop/buy";
import {DB} from "@/index";
import {BotEvent} from "@/types";
import {Events, Interaction, TextChannel} from "discord.js";
import {ShopItem} from "@/classes/ShopItem";
import {UserItem} from "@/classes/UserItem";

function stockCheck(item: ShopItem) {
    if (item.action == 2) {
        // Text object are handled differently
        return item.texts?.length! > 0;
    } else {
        return item.max_quantity! != 0;
    }
}

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!DB.isReady) return;

        if (!interaction.isButton()) return;

        if (!interaction.customId.startsWith("buy")) return;

        const guild = DB.getGuild(interaction.guildId!);
        const user = guild.getUser(interaction.user.id);

        // Using this instead of `interaction.member` because `interaction.member` is not well typed
        const member = await interaction.guild!.members.fetch(interaction.user.id);

        const item = guild.getShopItem(interaction.customId.split("-")[1]);

        if (item === null) {
            await interaction.reply({
                embeds: [itemNotFound(guild.lang)],
                ephemeral: true,
            });
            return;
        }

        //TODO: Error embed
        else if (!stockCheck(item)) {
            await interaction.reply({
                content: "Item not available!",
                ephemeral: true,
            });
            return;
        }

        //TODO: Error embed
        else if (user!.storePoints < item.price) {
            await interaction.reply({
                content: "Not enough money!",
                ephemeral: true,
            });
            return;
        } else {
            switch (item.action) {
                case 0: // role
                    const role = interaction.guild!.roles.cache.get(item.applied_id!);

                    if (role === undefined) {
                        await interaction.reply({
                            embeds: [itemNotFound(guild.lang)],
                            ephemeral: true,
                        });
                    } else {
                        // Try to add the role
                        try {
                            await member!.roles.add(role);
                            await interaction.reply({
                                content: "Role added!",
                                ephemeral: true,
                            });

                            item.buy(user, (userItem: UserItem) => {
                                userItem.appliedId = role.id;
                                userItem.used = true;
                                userItem.update();
                            });
                        } catch (error) {
                            await interaction.reply({
                                content: "Error while adding the role!",
                                ephemeral: true,
                            });
                            return;
                        }
                    }
                    break;
                case 1: // boost
                    await interaction.reply({
                        content: "Boost added!",
                        ephemeral: true,
                    });

                    item.buy(user, (userItem: UserItem) => {
                        userItem.appliedId = item.applied_id;
                        userItem.boostMultiplier = item.multiplier;
                        userItem.boostDuration = item.boost_duration;
                        userItem.boostType = item.boost_type;

                        userItem.update();
                    });
                    break;

                case 2: // text
                    const text = item.getUnusedTexts()![0]; // No need to check if empty,
                    try {
                        // stockCheck() already did it

                        // TODO: Create a new embed with the text
                        await member.send({
                            content: text.content,
                        });
                        text.use();

                        item.buy(user, (userItem: UserItem) => {
                            userItem.textValue = text.content;
                            userItem.used = true;
                            userItem.update();
                        });
                    } catch (error) {
                        // TODO: Create a new embed with the text
                        await interaction.reply({
                            content: "Error while sending the text! Purchase cancelled.",
                            ephemeral: true,
                        });
                        return;
                    }
                    break;

                case 3: // custom/object
                    // TODO: Create a new embed with the text
                    await interaction.reply({
                        content: "Item added!",
                        ephemeral: true,
                    });

                    item.buy(user, (userItem: UserItem) => {
                        userItem.appliedId = item.applied_id;
                        userItem.used = true;
                        userItem.update();
                    });
                    break;
                default:
                    break;
            }
        }

        await (
            interaction.client.channels.cache.get(guild.logChannel) as TextChannel
        ).send({
          embeds: [
            buyShopLogEmbed(
                guild.lang,
                interaction.user.id,
                item!.label,
                item!.price,
                guild.pointName
            ),
          ],
        });
    },
};

export default event;
