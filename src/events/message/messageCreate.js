const client = require("../..");
const devs = ["700397009336533032", "790891465593192458"];
client.on("messageCreate", async (msg) => {
  const args = msg.content.trim().split(/ +/g);
  const cmd = args.shift();
  if (msg.mentions.members.has("837306535813054464"))
    return msg.reply(`pogchampy = pog`);
  if (!devs.includes(msg.author.id)) return;
  if (cmd == "eval") {
    try {
      const code = args.join(" ");
      const evaled = require("util").inspect(eval(code));
      await msg.reply({
        content: `\`\`\`js\n${evaled}\`\`\``,
      });
    } catch (err) {
      await msg.reply({
        content: `\`\`\`js\n${err.message}\`\`\``,
      });
    }
  }
});
