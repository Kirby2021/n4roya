const client = require("../..");
client.on("ready", async () => {
  console.log("-".repeat("Successfully connected to Discord.".length));
  console.log(`Successfully connected to Discord.`);
  console.log("-".repeat("Successfully connected to Discord.".length));
  console.log(`Creating slash commands...`);
  console.log("-".repeat("Creating slash commands...".length));
  const commands = client.commands.reduce((a, commands) => {
    a.push(commands);
    return a;
  }, []);
  const testCommands = commands.reduce((a, commands) => {
    if (commands.test) a.push(commands);
    return a;
  }, []);
  const globalCommands = commands.reduce((a, commands) => {
    if (!commands.test) a.push(commands);
    return a;
  }, []);

  client.manager.on("nodeError", (node, error) => {
    console.log(
      `Node "${node.options.identifier}" encountered an error: ${error.message}.`
    );
  });
  client.manager.on("trackStart", async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(
      `Now Playing: \`${track.title}\`, requested by ${track.requester.tag}`
    );
  });

  client.manager.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(`Queue Ended... Leaving!`);
    player.destroy();
  });
  await client.application.commands.set(testCommands);
  await client.guilds.cache
    .get(client.supportGuild)
    .commands.set(globalCommands);
  client.manager.init(client.user.id);
});

client.on("raw", (d) => client.manager.updateVoiceState(d));
