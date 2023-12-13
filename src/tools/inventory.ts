import { UserItem } from "@/classes/UserItem";
import i18next from "i18next";
import {getEmoji} from "@/constants";

export const getItemsField = function getUsersField(
    startingFrom: number,
    itemList: UserItem[],
    lang: string,
): { name: string; value: string }[] {
    i18next.changeLanguage(lang);

    const fields: { name: string; value: string }[] = [];

    itemList.sort(
        (a, b) =>
            b.purchaseDate.getTime() - a.purchaseDate.getTime()
    );

    startingFrom = (startingFrom - 1) * 10;

    const emojis = [
        getEmoji("pink_at"),
        getEmoji("pink_flask"),
        getEmoji("pink_text"),
        getEmoji("pink_object"),
    ]

    // We add the n + 10 first users to the embed. If there are less than 10 users, we stop the loop.
    for (let i: number = startingFrom; i < startingFrom + 10; i++) {
        const item = itemList[i];

        if (item) {

            const emoji = emojis[item.itemType];

            fields.push({
                name: ` `,
                value:
                    `**${emoji} ${item.itemName}**`
                    + "\n"
                    + i18next.t("embeds:inventory.boughtAt", {
                        date: `<t:${Math.floor(item.purchaseDate.getTime() / 1000)}:F>` ,
                    })
                    + (item.refunded ? i18next.t("embeds:inventory.refunded") : "")
                    + (item.used ? i18next.t("embeds:inventory.used") : "")
                    + "\n"
                    + i18next.t("embeds:inventory.id", {
                        id: item.id
                    })
            });
        }
    }
    return fields;
};
