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
  await client.application.commands.set(globalCommands);
  await client.guilds.cache.get(client.supportGuild).commands.set(testCommands);
});
