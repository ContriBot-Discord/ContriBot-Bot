import { EmbedBuilder } from "discord.js";

export default function (title: string): EmbedBuilder {
  return new EmbedBuilder().setTitle(title);
}
