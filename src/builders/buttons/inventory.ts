import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (displayRefunds: boolean, displayUses: boolean): ActionRowBuilder<ButtonBuilder> {

    const parser = " " + displayRefunds + " " + displayUses

    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder().setCustomId("INVprevious" + parser ).setLabel("◀︎").setStyle(1)
                .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder().setCustomId("INVnext" + parser).setLabel("▶").setStyle(1)
        )
        .addComponents(
            new ButtonBuilder().setCustomId("INVrefresh" + parser).setLabel("↻").setStyle(1)
        );
}
