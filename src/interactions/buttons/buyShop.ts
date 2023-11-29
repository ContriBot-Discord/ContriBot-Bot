import itemNotFound from "@/builders/embeds/errors/itemNotFound";
import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    if (!interaction.customId.startsWith("buy")) return;

    const guild = DB.getGuild(interaction.guildId!);
    const user = guild.getUser(interaction.user.id);
    let success = false;

    // Using this instead of `interaction.member` because `interaction.member` is not well typed
    const member = await interaction.guild!.members.fetch(interaction.user.id);

    const item = guild.getShopItem(interaction.customId.split("-")[1]);

    // TODO: Check if the user has enough money to buy the item OR if the item is available

    if (item === null) {
      await interaction.reply({
        embeds: [itemNotFound(guild.lang)],
        ephemeral: true,
      });
    } else {

      // TODO: Complete the switch statement
      switch (item.action){

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
                  success = true;

                } catch (error) {
                  await interaction.reply({
                    content: "Error while adding the role!",
                    ephemeral: true,
                  });
                }
              }
              break;
        case 1: // boost
          break;

        case 2: // text
          break;

        case 3: // custom/object
          break;

        default:
          break;
      }
      // TODO : Add the item to the user's inventory
        if (success) {
            item.buy(user);
        }
    }
  },
};

export default event;
