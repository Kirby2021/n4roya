const { Schema, model, SchemaTypes } = require("mongoose");
const reputation = model(
  "reputation",
  new Schema({
    User: {
      required: true,
      type: SchemaTypes.String,
    },
    Reputations: {
      required: false,
      type: SchemaTypes.Number,
      default: 0,
    },
  })
);

module.exports = {
  reputation,
};
