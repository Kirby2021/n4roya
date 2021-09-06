const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "Avatar",
  type: "USER",
  test: true,
  run: async ({ interaction }) => {
    await interaction.deferReply();
    try {
      const user = interaction.targetUser;
      const avatars = {
        png: `[png](${user.displayAvatarURL({ format: "png" })})`,
        jpeg: `[jpeg](${user.displayAvatarURL({ format: "jpeg" })})`,
        webp: `[webp](${user.displayAvatarURL({ format: "webp" })})`,
        dynamic: `[dynamic](${user.displayAvatarURL({ dynamic: true })})`,
        img: user.displayAvatarURL({ dynamic: true, size: 4096 }),
      };
      const embed = new MessageEmbed()
        .setTitle(`Avatar`)
        .setDescription(
          `${avatars["png"]}\n${avatars["jpeg"]}\n${avatars["webp"]}\n${avatars["dynamic"]}`
        )
        .setImage(avatars["img"]);
      await interaction.editReply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
    }
  },
};
