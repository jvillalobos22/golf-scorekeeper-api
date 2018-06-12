const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Match } = require("./models/match");

const app = express();

app.use(bodyParser.json()); // use bodyParser middleware

app.post("/matches", (req, res) => {
  console.log(req.body);
  const match = new Match(req.body);

  match.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
