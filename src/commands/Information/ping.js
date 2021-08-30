module.exports = {
    name: 'ping',
    description: "Pong!",
    test: true,
    run: async({ interaction }) => {
        await interaction.reply(`Pong!`);
    }
}