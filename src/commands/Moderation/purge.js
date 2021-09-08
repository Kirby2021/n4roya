const Discord = require("discord.js");
const { CommandInteraction } = require("discord.js");

/**
 *
 * @param {Object} param0
 * @param {CommandInteraction} param0.interaction
 * @param {import("discord.js").CommandInteractionOption[]} param0.args
 */

module.exports = {
  name: "purge",
  description: "Clears the number of messages from a channel",
  test: true,
  options: [
    {
        name: "amount",
        description: "Amount of messages to delete",
        type: "NUMBER",
      },
    {
      name: "bots",
      type: "SUB_COMMAND",
      description: "Clears messages from bots only",
      options: [
        {
          name: "amount",
          description: "Amount of messages to delete",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
        name: "humans",
        type: "SUB_COMMAND",
        description: "Clears messages from humans only",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "embeds",
        type: "SUB_COMMAND",
        description: "Clears embeds only from a channel",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "files",
        type: "SUB_COMMAND",
        description: "Clears files only from a channel",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "mentions",
        type: "SUB_COMMAND",
        description: "Clears mentions only from a channel",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "pins",
        type: "SUB_COMMAND",
        description: "Clears pins only from a channel",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "text",
        type: "SUB_COMMAND",
        description: "Delete messages containing only text. (Ignores files/images/attachments, embeds)",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "match",
        type: "SUB_COMMAND",
        description: "Deletes messages which contains the given arguments",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "not-match",
        type: "SUB_COMMAND",
        description: "Deletes all messages but ignores the messages contianing the given arguments",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "startswith",
        type: "SUB_COMMAND",
        description: "Delete messages starts with the given arguments",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
      {
        name: "endswith",
        type: "SUB_COMMAND",
        description: "Delete messages ends with the given arguments",
        options: [
            {
              name: "amount",
              description: "Amount of messages to delete",
              type: "NUMBER",
              required: true,
            },
          ],
      },
  ],

  run: async ({ interaction }) => {
    if (!interaction.member.permissions.has(`BAN_MEMBERS`))
      return await interaction.reply({
        content: `You cannot perform this action.`,
        ephemeral: true,
      });
    try {
      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount))
        return interaction.reply(
          "Next time enter something which is actually a number."
        );
      if (!amount || amount < 2 || amount > 100)
        return interaction.reply(
          "Please enter a number of message between 2 and 100."
        );
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async (m) => {
            let embed = new Discord.MessageEmbed()
              .setColor("0x#00ffff")
              .setDescription(
                `✅  Cleared **${m.size}**/**${amount}** messages!`
              );

            message.channel
              .send(embed)
              .then((msg) => msg.delete({ timeout: 4000 }));
          });
        } catch (e) {
          console.log(e);
          message.channel.send(
            `You can only delete the messages which are not older than 14 days.`
          );
        }
      } else if (args[1]) {
        let msg;
        let data;
        let embed;
        switch (args[1]) {
          case "--bots":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (ms.author.bot && !ms.pinned) data.push(ms);
              });

            try {
              await message.delete();
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--humans":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!ms.author.bot && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--embeds":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (ms.embeds.length && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );
                  await client.modlogs(
                    message,
                    `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                  );
                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--files":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (ms.attachments.first() && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--text":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!ms.attachments.first() && !ms.embeds.length && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--mentions":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (
                  (ms.mentions.users.first() ||
                    ms.mentions.members.first() ||
                    ms.mentions.channels.first() ||
                    ms.mentions.roles.first()) &&
                  !ms.pinned
                )
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--pins":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--match":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!args[2]) return message.channel.send(embd);
                if (ms.content.includes(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--not":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!args[2]) return message.channel.send(embd);
                if (!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--startswith":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!args[2]) return message.channel.send(embd);
                if (
                  ms.content.startsWith(args.slice(2).join(" ")) &&
                  !ms.pinned
                )
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          case "--endswith":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (!args[2]) return message.channel.send(embd);
                if (ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async (m) => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `✅  Cleared **${m.size}**/**${amount}** messages!`
                    );

                  message.channel
                    .send(embed)
                    .then((msg) => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `You can only delete the messages which are not older than 14 days.`
              );
            }

            break;
          default:
            return message.channel.send(embd);
            break;
        }
      } else {
        return message.channel.send(`An error occoured.`);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(`An error occurred: \`${error}\``);
    }
  },
};
