const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban users",
  options: [
    {
      name: "user",
      description: "User to ban",
      type: "USER",
      required: true,
    },
  ],
  /**
   *
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   * @param {import("discord.js").CommandInteractionOption[]} param0.args
   */
  run: async ({ interaction, args }) => {
    if (!interaction.member.permissions.has(`BAN_MEMBERS`))
      return await interaction.reply({
        content: `You cannot perform this action.`,
        ephemeral: true,
      });
    await interaction.deferReply();
    const user = args[0].user;
    try {
      const ban = await interaction.guild.bans.create(user, {
        days: 7,
        reason: `Ban by ${interaction.user.tag}`,
      });
      await interaction.editReply({
        content: `Banned ${ban.username}.`,
      });
    } catch (error) {
      return await interaction.editReply(
        `Could not ban ${user.username}:\n${error.message}`
      );
    }
  },
};
