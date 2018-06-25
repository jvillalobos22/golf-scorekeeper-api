require('./config/config');

// const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const cors = require('cors');

const { mongoose } = require('./db/mongoose');
const { Match } = require('./models/match');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json(), cors()); // use bodyParser middleware

// POST /matches
app.post('/matches', (req, res) => {
  // console.log(req.body);
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

// GET /matches
app.get('/matches', (req, res) => {
  // console.log(req.body);

  Match.find()
    .then(matches => {
      res.send({ matches });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// DELETE /matches/:id
app.delete('/matches/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Match.findOneAndRemove({
    _id: id
  })
    .then(match => {
      if (!match) return res.status(404).send();
      res.send({ match });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
