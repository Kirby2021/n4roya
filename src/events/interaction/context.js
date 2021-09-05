const client = require("../..");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isContextMenu()) return;
  if (!interaction.guild) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  interaction.targetUser = (
    await interaction.guild.members.cache.get(interaction.targetId).fetch()
  ).user;
  command.run({
    client,
    interaction,
    util: require("../../Util"),
  });
  console.log(`${interaction.user.tag} ran menu: ${command.name}`);
});
