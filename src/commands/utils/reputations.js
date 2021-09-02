const rep = require(`../../Util/models`).reputation;
module.exports = {
  name: "reputations",
  description: `Check reputations count of a user`,
  options: [
    {
      name: "user",
      description: "User to check count of",
      type: "USER",
      required: false,
    },
  ],
  /**
   *
   * @param {Object} param0
   * @param {import("discord.js").CommandInteractionOption[]} param0.args
   */
  run: async ({ interaction, args }) => {
    const user = args[0]?.user || interaction.user;
    let data = await rep.findOne({ User: user.id });
    if (!data) {
      data = new rep({
        User: user.id,
      });
      await data.save();
    }
    return await interaction.reply(
      `${user.tag}'s reputation: ${data.Reputations}`
    );
  },
};
