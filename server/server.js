const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db/mongoose');
const { Match } = require('./models/match');

const app = express();

app.use(bodyParser.json(), cors()); // use bodyParser middleware

app.post('/matches', (req, res) => {
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

app.get('/matches', (req, res) => {
  console.log(req.body);

  Match.find()
    .then(matches => {
      res.send({ matches });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});

module.exports = {
  app
};
