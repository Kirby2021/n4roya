const { CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../Util/models").autoResponse;
module.exports = {
  name: "autoresponse",
  description: "Settings for the autoresponse",
  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "Add an autoresponse",
      options: [
        {
          name: "query",
          description: "Query to trigger autoresponse",
          type: "STRING",
          required: true,
        },
        {
          name: "response",
          description: "Response of the bot when query is triggered",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "Remove an autoresponse",
      options: [
        {
          name: "query",
          description: "Query of the autoresponse",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "list",
      description: "List all the autoresponses",
    },
  ],
  /**
   *
   * @param {Object} param0
   * @param {CommandInteraction} param0.interaction
   */
  run: async ({ interaction }) => {
    await interaction.deferReply();
    const args = interaction.options.data.reduce((accumulator, data) => {
      if (data.value) accumulator.push(data.value);
      if (data.name) accumulator.push(data.name);
      return accumulator;
    }, []);
    const [subcommand] = args;
    switch (subcommand) {
      case "add":
        if (!interaction.member.permissions.has("MANAGE_GUILD"))
          return await interaction.editReply({
            content: `You need \`MANAGE_GUILD\` permission to use this command`,
            ephemeral: true,
          });
        let exists = await model.findOne({
          Guild: interaction.guild.id,
          Query: interaction.options.data[0].options[0].value,
        });
        if (exists)
          return await interaction.editReply(
            `That autoresponse already exists!`
          );
        let addData = new model({
          Guild: interaction.guild.id,
          Query: interaction.options.data[0].options[0].value.toLowerCase(),
          Response: interaction.options.data[0].options[1].value,
        });
        await addData.save();
        await interaction.editReply(`Autoresponse created.`);
        break;
      case "remove":
        if (!interaction.member.permissions.has("MANAGE_GUILD"))
          return await interaction.editReply({
            content: `You need \`MANAGE_GUILD\` permission to use this command`,
            ephemeral: true,
          });
        let removeData = await model.findOne({
          Guild: interaction.guild.id,
          Query: interaction.options.data[0].options[0].value,
        });
        if (!removeData)
          return await interaction.editReply(`That autoresponse doesn't exist`);
        await model.findOneAndDelete({
          Guild: interaction.guild.id,
          Query: interaction.options.data[0].options[0].value.toLowerCase(),
        });
        await interaction.editReply(`Successfully deleted autoresponse.`);
        break;
      case "list":
        let all = await model.find({ Guild: interaction.guild.id });
        const embed = new MessageEmbed().setTitle(`Autoresponses`);
        all.forEach((e) => {
          embed.addField(e.Query, e.Response, true);
        });
        await interaction.editReply({
          embeds: [embed],
        });
    }
  },
};
