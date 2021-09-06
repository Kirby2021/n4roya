const { CommandInteraction } = require("discord.js");
const Naroya = require("../../Util/client");
module.exports = {
  name: "play",
  description: `Play a song`,
  options: [
    {
      name: "song",
      description: "Song name query",
      type: "STRING",
    },
  ],
  /**
   *
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   * @param {import("discord.js").CommandInteractionOption[]} param0.args
   * @param {import("../../Util/client")} param0.client
   */
  run: async ({ client, interaction, args }) => {
    const search = args[0].value;
    await interaction.deferReply();
    if (!interaction.member.voice.channelId)
      return await interaction.editReply(
        `You cannot listen to songs without joining a voice channel!`
      );
    /** @type {import("erela.js").SearchResult} */
    let response;
    try {
      response = await client.manager.search(search, interaction.user);
      if (response.loadType === "LOAD_FAILED") throw response.exception;
      else if (response.loadType === "PLAYLIST_LOADED")
        return await interaction.editReply(`You cannot play playlists!`);
    } catch (error) {
      return await interaction.editReply(`An error occured:\n${error.message}`);
    }
    const player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: interaction.member.voice.channelId,
      textChannel: interaction.channel.id,
    });
    player.connect();
    player.queue.add(response.tracks[0]);
    if (!player.playing && !player.paused && player.queue.size === 0)
      player.play();
    await interaction.editReply(`Enqueueing \`${response.tracks[0].title}\``);
  },
};
