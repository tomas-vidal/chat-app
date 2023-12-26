const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = createServer(app);
const mongoose = require("mongoose");
const port = 3000;
const Message = require("./models/Message");
const dotenv = require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    credentials: true,
  },
});

main()
  .then(() => console.log("Succesfully connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.API);
}

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/messages", (req, res) => {
  Message.countDocuments({}).then(async (count) => {
    const messages = await Message.find({}, "text username -_id").skip(
      count - 10
    );
    res.send(messages).end();
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", async ({ text, username }) => {
    const newMessage = new Message({
      text,
      username,
    });
    await newMessage.save();
    console.log(text, username);
    io.emit("chat message", { text, username });
  });
});
