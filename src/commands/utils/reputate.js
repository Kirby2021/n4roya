const reputationModel = require("../../Util/models").reputation;
const Naroya = require("../../Util/client");

module.exports = {
  name: "reputate",
  description: "Someone helped you and you want to thank them? Reputate them!",
  options: [
    {
      name: "user",
      description: "User who helped you!",
      type: "USER",
      required: true,
    },
  ],
  /**
   *
   * @param {Object} param0
   * @param {Naroya} param0.client
   * @param {import("discord.js").CommandInteractionOption[]} param0.args
   */
  run: async ({ client, interaction, args }) => {
    const rep = client.collections.repCooldown;
    if (rep.has(interaction.user.id))
      return await interaction.reply(
        `You are on a reputation cooldown of 25 minutes!`
      );
    await interaction.deferReply();
    const user = args[0].user;
    if (user.id == interaction.user.id)
      return await interaction.editReply(`You cannot reputate yourself.`);
    let data = await reputationModel.findOne({ User: user.id });
    if (!data) {
      data = new reputationModel({
        User: user.id,
      });
      await data.save();
    }
    await reputationModel.findOneAndUpdate(
      { User: user.id },
      { Reputations: data.Reputations + 1 }
    );
    await interaction.editReply(`Reputated ${user.tag}!`);
    rep.set(interaction.user.id, true);
    setTimeout(() => {
      rep.delete(interaction.user.id);
    }, 1000 * 60 * 25);
  },
};
