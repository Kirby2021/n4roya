const client = require("../..");
client.on("messageCreate", async (msg) => {
  const args = msg.content.trim().split(/ +/g);
  const cmd = args.shift();
  if (msg.author.id !== "700397009336533032") return;
  if (cmd == "eval") {
    const code = args.join(" ");
    const evaled = require("util").inspect(eval(code));
    await msg.reply({
      content: `\`\`\`js\n${evaled}\`\`\``,
    });
  }
});
