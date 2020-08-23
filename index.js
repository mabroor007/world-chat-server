const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const Chats = require("./Chats");
const Filter = require("bad-words");
const filter = new Filter();

// connection to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/worldchat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to the database up and running.....");
  })
  .catch((err) => console.log(err));

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  Chats.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.post("/", (req, res) => {
  const post = {
    name: filter.clean(req.body.name),
    message: filter.clean(req.body.message),
  };
  const chat = new Chats(post);
  chat
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

const PORT = process.env.PORT || 4000;

// Server listening
app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}...`);
});
