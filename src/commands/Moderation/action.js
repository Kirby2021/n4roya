const { CommandInteraction, MessageActionRow, MessageButton, Message, User } = require("discord.js");
const { BADHINTS } = require("dns");

module.exports = {
    name: 'action',
    description: "Take Action on a member(kick, ban etc)",
    options: [
        {
            name: 'member',
            type: "USER",
            description: "Member you want to take action on",
            required: true,
        }
    ],
    test: true,
    /**
     * 
     * @param {Object} param0 
     * @param {CommandInteraction} param0.interaction
     * @param {import("discord.js").CommandInteractionOption[]} param0.args
     */
    run: async({ interaction, args }) => {
        const member = args[0].user.id;
        if(!member) return await interaction.reply({ content: `You need to mention a user in this server!`, ephemeral: true });
        const buttons = new MessageActionRow()
            .addComponents(new MessageButton({ emoji: "🔨", label: "Ban", customId: "ban", style: "DANGER" }), new MessageButton({ emoji: "🦵", label: "Kick", style: "SECONDARY", customId: "kick" }));
        await interaction.reply({ content: `Which action do you want to take?`, components: [buttons] });
        const collector = interaction.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            filter: (i) => i.user.id == interaction.user.id,
            max: 1,
            time: 30000
        });
        collector.on('collect', async(int) => {
            await int.deferUpdate();
            if(int.customId == 'ban') {
                if(!int.member.permissions.has("BAN_MEMBERS")) return await int.followUp(`You cannot ban members due to not having Ban Members permission`);
                if(int.guild.members.cache.get(member)?.roles.highest.position > int.member.roles.highest.position) return await int.followUp(`You cannot ban that member due to hierarchy issues.`);
                if(!int.guild.me.permissions.has("BAN_MEMBERS")) return await int.followUp(`I cannot ban that member due to me not having the Ban Members permission!`);
                if(int.guild.members.cache.get(member)?.roles.highest.position > int.guild.me.roles.highest.position) return await int.followUp(`You cannot ban that member due to hierarchy issues.`);
                try {
                    const ban = await interaction.guild.bans.create(member, {
                        days: 7,
                        reason: `Ban by ${interaction.user.tag}`
                    });
                    await int.followUp(`Banned ${typeof ban == User ? ban.tag : ban.user.tag}`);
                } catch (err) {
                    console.error(err);
                    await int.followUp(`I could not ban that member!`);
                }
            } else if(int.customId == 'kick') {
                if(!int.member.permissions.has("BAN_MEMBERS")) return await int.followUp(`You cannot ban members due to not having Ban Members permission`);
                if(int.guild.members.cache.get(member)?.roles.highest.position > int.member.roles.highest.position) return await int.followUp(`You cannot ban that member due to hierarchy issues.`);
                if(!int.guild.me.permissions.has("KICK_MEMBERS")) return await interaction.followUp(`I cannot ban that member due to me not having the Kick Members permission!`);
                if(int.guild.members.cache.get(member)?.roles.highest.position > int.guild.me.roles.highest.position) return await int.followUp(`You cannot ban that member due to hierarchy issues.`);
                try {
                    const mem = await int.guild.members.fetch(member);
                    if(!mem) return await int.followUp(`Could not find that member.`);
                    await mem.kick(`Kick by ${interaction.user.tag}`);
                    await int.followUp(`Kicked ${mem.user.tag}`);
                } catch (err) {
                    await int.followUp(`I could not kick that member!`);
                    return;
                }
            }
        })
    }
}