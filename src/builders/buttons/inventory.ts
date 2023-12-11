import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export default function (): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder().setCustomId("INVprevious").setLabel("◀︎").setStyle(1)
                .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder().setCustomId("INVnext").setLabel("▶").setStyle(1)
        )
        .addComponents(
            new ButtonBuilder().setCustomId("INVrefresh").setLabel("↻").setStyle(1)
        );
}
