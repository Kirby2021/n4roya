const client = require("../..");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.guild) return;
  const arguments_ = interaction.options?.data;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.run({
      client,
      interaction,
      args: arguments_,
      util: require("../../Util"),
    });
  } catch (error) {
    interaction.reply({
      content: `An error occured\n${error.message}`,
      ephemeral: true,
    });
    console.log(error);
    console.log(
      `User ${interaction.user.tag} tried running command ${command.name} but failed (ERROR)`
    );
  }
  console.log(`${interaction.user.tag} ran command: ${command.name}`);
});
