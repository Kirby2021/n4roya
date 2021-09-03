const client = require("../..");
const model = require("../../Util/models").autoResponse;
client.on("messageCreate", async (message) => {
  if (!message.guild || !message.content) return;
  const exists = await model.findOne({
    Guild: message.guild.id,
    Query: message.content.toLowerCase(),
  });
  if (exists)
    return await message.reply(`**(AutoResponse)**\n${exists.Response}`);
});
