import { getItemEmoji } from "@/tools/shopFunctions/embeds";
import { ActionRowBuilder, ButtonBuilder, Collection, Role } from "discord.js";
import {UserItem} from "@/classes/UserItem";

export default function (
    startingFrom: number,
    itemList: UserItem[],
    roles: Collection<string, Role>,
    scope: string
): ActionRowBuilder<ButtonBuilder> {
    startingFrom = (startingFrom - 1) * 5;

    const buttons = new ActionRowBuilder<ButtonBuilder>();

    for (let i: number = startingFrom; i < startingFrom + 5; i++) {
        const item = itemList[i];

        let style: number;

        switch (scope) {
            case "refund":
                style = 3;
                break;
            case "delete":
                style = 4;
                break;
            default:
                style = 1;
        }

        if (item) {
            const label: string =
                item.itemType == 0
                    ? roles.get(item.itemName.match(/<@&(\d+)>/)![1])?.name!
                    : item.itemName;

            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId(scope + `-${item.id}`)
                    .setLabel(label)
                    .setEmoji(getItemEmoji(item.itemType))
                    .setStyle(style)
            );
        }
    }

    return buttons;
}
