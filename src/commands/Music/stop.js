const { CommandInteraction } = require("discord.js");
const Naroya = require("../../Util/client");
module.exports = {
  name: "stop",
  description: `Stop music!`,
  /**
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   * @param {Naroya} param0.client
   */
  run: async ({ client, interaction }) => {
    const player = client.manager.players.get(interaction.guildId);
    if (!player.playing)
      return await interaction.reply(`I am not playing music!`);
    player.stop();
    await interaction.reply(`Stopped music...`);
  },
};
