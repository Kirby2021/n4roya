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
const autoResponse = model(
  "autoresponse",
  new Schema({
    Guild: {
      required: true,
      type: SchemaTypes.String,
    },
    Query: {
      required: true,
      type: SchemaTypes.String,
    },
    Response: {
      required: true,
      type: SchemaTypes.String,
    },
  })
);

module.exports = {
  reputation,
  autoResponse,
};
