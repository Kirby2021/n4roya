const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Formatters } = require("discord.js");

const outdent = require("outdent");
module.exports = {
  name: "info",
  description: "View information about the server or a role",
  test: true,
  options: [
    {
      name: "server",
      type: "SUB_COMMAND",
      description: "Information about the server",
    },
    {
      name: "role",
      type: "SUB_COMMAND",
      description: "Information about a role",
      options: [
        {
          name: "role",
          description: "Role to show information of",
          type: "ROLE",
        },
      ],
    },
    {
      name: "user",
      type: "SUB_COMMAND",
      description: "information about a user",
      options: [
        {
          name: "user",
          description: "User to get information from",
          type:"USER",
          required: true,
      }, 
      {
          name: "ephemeral",
          description: "The output can only be viewed by yourself or not",
          type: "BOOLEAN",
          required: false
      }
      ],
    },
  ],
  /**
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   */
  async run({ interaction }) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "server":
        const { guild } = interaction;
        for (x of guild.members.cache) {
          await x.fetch();
        }
        await guild.fetch();
        const embed = new MessageEmbed()
          .setTitle(guild.name)
          .setDescription(guild.description || "No server descripion")
          .setThumbnail(guild.iconURL({ dynamic: true, format: "png" }));
        if (guild.afkChannel)
          embed.addField(`AFK Channel`, guild.afkChannel.toString());
        if (guild.vanityURLCode)
          embed.addField(
            `Vanity URL`,
            `discord.gg/${guild.vanityURLCode} | ${guild.vanityURLUses} uses`
          );
        embed.addField(
          `Channels`,
          `\`\`\`${
            guild.channels.cache.filter((a) => a.type === "GUILD_TEXT").size
          } Text Channels | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_VOICE").size
          } Voice Channels | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_STAGE_VOICE")
              .size
          } Stage Channels | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_NEWS").size
          } News Channels | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_PUBLIC_THREAD")
              .size
          } Public Threads | ${
            guild.channels.cache.filter(
              (a) => a.type === "GUILD_PRIVATE_THREAD"
            ).size
          } Private Threads | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_NEWS_THREAD")
              .size
          } News Threads | ${
            guild.channels.cache.filter((a) => a.type === "GUILD_STORE").size
          } Store Channels\n\n ${guild.channels.cache.size} Total\`\`\``
        );
        embed.addField(
          `Members`,
          `\`\`\`${
            guild.members.cache.filter((a) => a.presence?.status === "online")
              .size
          } Online | ${
            guild.members.cache.filter((a) => a.presence?.status === "offline")
              .size
          } Offline | ${
            guild.members.cache.filter((a) => a.presence?.status === "dnd").size
          } Do Not Disturb | ${
            guild.members.cache.filter((a) => a.presence?.status === "idle")
              .size
          } Idle\n\n ${guild.members.cache.size} Total\`\`\``
        );
        embed.addField(`2FA`, `${guild.mfaLevel === "NONE" ? "Off" : "On"}`);
        let invs = await guild.invites.fetch();
        embed.addField(`Invite count`, invs.size.toLocaleString());
        let owner = await guild.fetchOwner();
        embed.addField(`Owner`, owner.toString());
        if (guild.systemChannel)
          embed.addField(`System channel`, guild.systemChannel.toString());
        if (guild.banner)
          embed.setImage(guild.bannerURL({ format: "png", size: 4096 }));
        const bans = await guild.bans.fetch();
        embed.addField(`Total bans`, bans.size.toLocaleString());
        await interaction.reply({ embeds: [embed] });
        break;
      case "user":
        let args = interaction.options.data;
        let user = args[0].user;
        let ephemeral = args[1]?.value;
        let avatar = {
            png: user.displayAvatarURL({ format: 'png' }),
            jpeg: user.displayAvatarURL({format: 'jpeg'}),
            jpg: user.displayAvatarURL({ format: 'jpg' }),
            gif: user.displayAvatarURL({ format: 'gif' }),
            webp: user.displayAvatarURL({ format: 'webp' }),
            dynamic: user.displayAvatarURL({ format: 'png', dynamic: true })
        }
        let av = `[png](${avatar.png}) | [jpeg](${avatar.jpeg}) | [jpg](${avatar.jpg}) | [gif](${avatar.gif}) | [webp](${avatar.webp})`;
        let date = new Date(user.createdTimestamp);
        let member = interaction.guild.members.cache.get(user.id);
        let joinedDate = new Date(interaction.guild.members.cache.get(user.id).joinedTimestamp);
        let userowner = (await interaction.guild.fetchOwner({
            cache: true
        })).user;
        let userembed = new MessageEmbed()
            .setTitle(`${user.tag}`)
            .addField(`__Basic__`, outdent`
            **ID**: ${user.id}
            **Avatar**: ${av}
            **Discriminator**: ${user.discriminator}
            **Is Bot**: ${user.bot ? "Yes" : "No"}
            **Created**: \`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\`
            `)
            .addField(`__Member__`, outdent`
            **Joined At**: \`${joinedDate.getDate()}/${joinedDate.getMonth()}/${joinedDate.getFullYear()} ${joinedDate.getHours()}:${joinedDate.getMinutes()}:${joinedDate.getSeconds()}\`
            **Is Owner**: ${user.id == userowner.id ? "Yes" : "No"}
            **Roles**: ${member.roles.cache.filter(s => s.id !== interaction.guild.id).map(role => role).join(", ")}
            `)
            .setThumbnail(avatar.dynamic)
        let obj = {embeds:[userembed]};
        if(ephemeral) obj['ephemeral'] = ephemeral;
        await interaction.editReply(obj);
        break;
    }
  },
};
