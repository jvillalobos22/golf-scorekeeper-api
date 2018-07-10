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
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

// Route requires
const user = require('./routes/user');
const match = require('./routes/match');

// Middleware
app.use(
  bodyParser.json(),
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: ['x-auth', 'Content-Type', 'Authorization'],
    exposedHeaders: ['x-auth', 'Content-Type', 'Authorization']
  })
); // use bodyParser middleware
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

// Routes
app.use('/user', user);
app.use('/matches', match);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
