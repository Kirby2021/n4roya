const { Client, MessageEmbed, Collection } = require("discord.js");
require("dotenv").config();
const glob = require("util").promisify(require("glob"));
const consola = require("consola");

// const loggingSystem = {
//   success: consola?.default?.success,
//   log: consola?.default?.log,
//   error: consola?.default?.error,
//   info: consola?.default?.info,
//   consola: consola?.default,
// };
module.exports = class Naroya extends Client {
  /**
   *
   * @param {import('discord.js').ClientOptions} clientOptions
   */
  constructor(clientOptions = {}) {
    clientOptions.intents = 32767;
    clientOptions.partials = [
      "CHANNEL",
      "GUILD_MEMBER",
      "MESSAGE",
      "REACTION",
      "USER",
    ];
    clientOptions.allowedMentions = {
      repliedUser: false,
      roles: false,
      users: false,
    };
    clientOptions.failIfNotExists = true;
    clientOptions.presence = {
      activities: [
        {
          name: "Pog Cat",
          type: "WATCHING",
        },
      ],
    };
    clientOptions.retryLimit = 1;
    super(clientOptions);
  }
  collections = require("./collections");
  supportGuild = `858377063009222726`;
  // logger = loggingSystem;
  commands = new Collection();
  initialize = async () => {
    this.login(process.env.TOKEN);
    const commandFiles = await glob(`src/commands/**/*.js`);
    commandFiles.forEach((fileStr) => {
      const file = require(`${process.cwd()}/${fileStr}`);
      if (!file?.name)
        return console.log(
          `File ${fileStr.split("/")[-1]} doesn't have a name`
        );
      if (!["USER", "MESSAGE"].includes(file.type) && !file?.description)
        return console.log(`Command ${file.name} doesn't have a description`);
      this.commands.set(file.name, file);
    });
    const eventFiles = await glob(`src/events/**/*.js`);
    eventFiles.forEach((fileStr) => {
      require(`${process.cwd()}/${fileStr}`);
    });
  };
};
