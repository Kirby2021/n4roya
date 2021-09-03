const client = require("../..");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.guild) return;
  const args = interaction.options.data;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  command.run({
    client,
    interaction,
    args,
    util: require("../../Util"),
  });
  console.log(`${interaction.user.tag} ran command: ${command.name}`);
});
