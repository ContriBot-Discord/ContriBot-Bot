import itemNotFound from "@/builders/embeds/errors/itemNotFound";
import { DB } from "@/index";
import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import { ShopItem } from "@/classes/ShopItem";


function stockCheck(item: ShopItem) {
  if (item.action == 2){    // Text object are handled differently
    return item.texts?.length! > 0;
  } else {
    return item.max_quantity! > 0;
  }
}

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

    if (item === null) {
      await interaction.reply({
        embeds: [itemNotFound(guild.lang)],
        ephemeral: true,
      });
    }
    else if (!stockCheck(item)) {
      await interaction.reply({
        content: "Item not available!",
        ephemeral: true,
      });
    }
    else if (user!.storePoints < item.price) {
      await interaction.reply({
        content: "Not enough money!",
        ephemeral: true,
      });
    }
     else {

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
          const text = item.getUnusedTexts()![0]; // No need to check if empty,
          try {                                         // stockCheck() already did it
            await member.send({
              content: text.content,
            });
            text.use();
            success = true;
          } catch (error) {
            await interaction.reply({
              content: "Error while sending the text! Purchase cancelled.",
              ephemeral: true,
            });
          }
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
