const { CommandInteraction } = require("discord.js");
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
    }
  },
};
