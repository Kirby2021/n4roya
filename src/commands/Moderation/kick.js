const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick users",
  options: [
    {
      name: "user",
      description: "User to kick",
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
    const user = args[0].user;
    if (!interaction.member.permissions.has(`KICK_MEMBERS`))
      return await interaction.reply({
        content: `You cannot perform this action.`,
        ephemeral: true,
      });
    if (!(await interaction.guild.members.fetch({ user: user.id })))
      return await interaction.reply({
        content: "That user is not in the server.",
        ephemeral: true,
      });
    await interaction.deferReply();
    try {
      await (
        await interaction.guild.members.fetch({ user: user.id })
      ).kick(`Kicked by ${interaction.user.id}`);
      await interaction.editReply({
        content: `Kicked ${kick.username}.`,
      });
    } catch (error) {
      return await interaction.editReply(
        `Could not kick ${user.username}:\n${error.message}`
      );
    }
  },
};
