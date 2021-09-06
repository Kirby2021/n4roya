const { Client, MessageEmbed, Collection } = require("discord.js");
require("dotenv").config();
const glob = require("util").promisify(require("glob"));
const consola = require("consola");
const { Manager } = require("erela.js");
const nodes = [
  {
    host: "localhost",
    password: "passs",
    port: 6969,
  },
];

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
    clientOptions.intents = [
      "GUILD_VOICE_STATES",
      "GUILDS",
      "GUILD_BANS",
      "GUILD_EMOJIS_AND_STICKERS",
      "GUILD_MEMBERS",
      "GUILD_PRESENCES",
    ];
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
  manager = new Manager({
    // The nodes to connect to, optional if using default lavalink options
    nodes,
    // Method to send voice data to Discord
    send: (id, payload) => {
      const guild = this.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });

  collections = require("./collections");
  supportGuild = `858377063009222726`;
  // logger = loggingSystem;
  commands = new Collection();
  initialize = async () => {
    this.login(process.env.TOKEN);
    this.manager.on("nodeConnect", (node) => {
      console.log(`Node "${node.options.identifier}" connected.`);
    });
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
