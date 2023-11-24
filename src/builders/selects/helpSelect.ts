import { getEmoji } from "@/constants";
import {
  ActionRowBuilder,
  AnyComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default function (): ActionRowBuilder<AnyComponentBuilder> {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("Hselect")
      .setPlaceholder("Select the type of help you want")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("User")
          .setDescription("Show the user help menu.")
          .setEmoji(getEmoji("pink_person")!.value)
          .setValue("user"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Admin")
          .setDescription("Show the admin help menu.")
          .setEmoji(getEmoji("orange_shield")!.value)
          .setValue("admin"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Config")
          .setDescription("Show the config help menu.")
          .setEmoji(getEmoji("orange_hammer")!.value)
          .setValue("config"),
      ])
  );
}
