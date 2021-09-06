const client = require("../..");
const devs = new Set(["700397009336533032", "790891465593192458"]);
client.on("messageCreate", async (message) => {
  const arguments_ = message.content.trim().split(/ +/g);
  const cmd = arguments_.shift();
  if (message.mentions.members.has("837306535813054464"))
    return message.reply(`pogchampy = pog`);
  if (!devs.includes(message.author.id)) return;
  if (cmd == "eval") {
    try {
      const code = arguments_.join(" ");
      const evaled = require("util").inspect(eval(code));
      await message.reply({
        content: `\`\`\`js\n${evaled}\`\`\``,
      });
    } catch (error) {
      await message.reply({
        content: `\`\`\`js\n${error.message}\`\`\``,
      });
    }
  }
});
