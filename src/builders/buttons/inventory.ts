import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (displayRefunds: boolean, displayUses: boolean, admin:boolean = false): ActionRowBuilder<ButtonBuilder> {

    const parser = " " + displayRefunds + " " + displayUses

    const isAdmin = admin ? "a" : "";

    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder().setCustomId(isAdmin + "INVprevious" + parser ).setLabel("◀︎").setStyle(1)
                .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder().setCustomId(isAdmin + "INVnext" + parser).setLabel("▶").setStyle(1)
        )
        .addComponents(
            new ButtonBuilder().setCustomId(isAdmin + "INVrefresh" + parser).setLabel("↻").setStyle(1)
        );
}
