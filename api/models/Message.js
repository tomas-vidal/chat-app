const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    text: String,
    username: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
