require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

const { ObjectID } = require('mongodb');
const cors = require('cors');

const { mongoose } = require('./db/mongoose');
const { Match } = require('./models/match');
const passport = require('./passport');

const app = express();
const port = process.env.PORT;

// Route requires
const user = require('./routes/user');

// Middleware
app.use(bodyParser.json(), cors()); // use bodyParser middleware
app.use(morgan('dev'));
app.use(
  session({
    secret: 'stan-the-man',
    resave: false,
    saveUninitialized: false
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

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

// PATCH /matches/:id
app.patch('/matches/:id', (req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, [
    'course',
    'holes',
    'date',
    'par',
    'title',
    'isComplete'
  ]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  console.log(body);

  // findOneAndUpdate
  Match.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then(match => {
      if (!match) {
        return res.status(404).send();
      }
      console.log(match);
      res.send({ match });
    })
    .catch(e => res.status(400).send());
});

app.use('/user', user);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
