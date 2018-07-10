const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const passport = require('../passport');
const { authenticate } = require('../middleware/authenticate');

// POST /user
router.post('/', (req, res) => {
  const { username, password, displayName } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
        displayName: displayName
      });

      newUser
        .save()
        .then(() => {
          if (err) return res.json(err);

          return newUser.generateAuthToken();
        })
        .then(token => {
          res.header('x-auth', token).send(newUser);
        })
        .catch(e => {
          res.status(400).send(e);
        });
    }
  });
});

// POST /user/login
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    req.user
      .generateAuthToken()
      .then(token => {
        res.header('x-auth', token).send(req.user);
      })
      .catch(e => res.status(400).send());
  }
);

// GET /user
router.get('/', authenticate, (req, res, next) => {
  res.send(req.user);
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

// DELETE /user/logout
router.delete('/logout', authenticate, (req, res) => {
  console.log('request');
  console.log(req.headers);
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

module.exports = router;
