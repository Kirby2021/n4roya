module.exports = {
  name: "resume",
  description: `Resume a song`,
  /**
   *
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   * @param {import("discord.js").CommandInteractionOption[]} param0.args
   * @param {import("../../Util/client")} param0.client
   */
  run: async ({ interaction, client }) => {
    const player = client.manager.players.get(interaction.guildId);
    if (!player) return await interaction.reply(`The player is not active.`);
    player.pause(false);
    await interaction.reply(`Resumed song.`);
  },
};
