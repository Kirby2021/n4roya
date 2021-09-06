const { CommandInteraction } = require("discord.js");
const Naroya = require("../../Util/client");

module.exports = {
  name: "pause",
  description: "Pause music",
  /**
   *
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   * @param {Naroya} param0.client
   */
  run: async ({ client, interaction }) => {
    const player = client.manager.players.get(interaction.guildId);
    if (!player.playing)
      return await interaction.reply(`I am not playing any songs to pause.`);
    if (player.paused)
      return await interaction.reply(`The song is already paused.`);
    player.pause(true);
    await interaction.reply(`Paused music.`);
  },
};
