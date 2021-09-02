const client = new (require("./Util/client"))();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log(`Connected to MONGODB`);
  }
);

client.initialize();
module.exports = client;
