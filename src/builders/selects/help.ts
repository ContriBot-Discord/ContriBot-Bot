import { getEmoji } from "@/constants";
import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default function (): ActionRowBuilder<StringSelectMenuBuilder> {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("Hselect")
      .setPlaceholder("Select the type of help you want")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("User")
          .setDescription("Show the user help menu.")
          .setEmoji(getEmoji("pink_person"))
          .setValue("user"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Admin")
          .setDescription("Show the admin help menu.")
          .setEmoji(getEmoji("orange_shield"))
          .setValue("admin"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Config")
          .setDescription("Show the config help menu.")
          .setEmoji(getEmoji("orange_hammer"))
          .setValue("config"),
      ])
  );
}
