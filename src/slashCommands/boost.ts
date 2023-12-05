import {SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver} from "discord.js";
import { SlashCommand } from "@/types";
import { DB } from "@/index";

export const command: SlashCommand = {
  name: "boost",
  data: new SlashCommandBuilder()
    .setName("boost")
    .setDescription("Use a boost from your inventory")
    .addIntegerOption(option =>
      option.setName('id')
        .setDescription('ID of the boost to apply')
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction: CommandInteraction) {
    const guild = DB.getGuild(interaction.guildId!);
    const user = guild.getUser(interaction.user.id);

    const options = interaction.options as CommandInteractionOptionResolver

    const boostId = options.getInteger('id', true);

    const item = user.inventory.find(item => item.id == boostId && item.itemType === 1 && !item.used);

    if (!item) {
      await interaction.reply({
        content: "You do not have any boosts in your inventory with the provided ID.",
        ephemeral: true,
      });
      return;
    }

    const extendedBoost = guild.applyBoost(item.toBoost());

    let appliedIdMenton: string | null;

    switch (item.boostType) {

        case 1: // guild
            appliedIdMenton = `the guild`;
            break;

        case 2: // channel
            appliedIdMenton = `<#${item.appliedId}>`;
            break;

        case 3: // role
            appliedIdMenton = `<@&${item.appliedId}>`;
            break;

        case 4: // User
            appliedIdMenton = `<@${item.appliedId}>`;
            break;
    }


    if (!extendedBoost) {
      await interaction.reply({
        content: "Extended the amazing boost that was already active, so it is amazing for even longer!",
        ephemeral: true,
      });
    } else {

        // Retrieve the applied id from the cache and mention it

        await interaction.reply({
            content: `Yay ! I just spread the amazing (gluten-free) boost potion on ${appliedIdMenton!} !`,
            ephemeral: true,
        });
    }

    item.used = true;
    item.update();

  },
};