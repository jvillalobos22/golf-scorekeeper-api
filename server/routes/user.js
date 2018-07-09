const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const passport = require('../passport');
const { authenticate } = require('../middleware/authenticate');

router.post('/', (req, res) => {
  console.log('user signup');

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

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    // console.log('logged in', req.user);

    req.user
      .generateAuthToken()
      .then(token => {
        res.header('x-auth', token).send(req.user);
      })
      .catch(e => res.status(400).send());
  }
);

// router.get('/', (req, res, next) => {
//   console.log('===== user!!======');
//   console.log(req.user);
//   var token = req.header('x-auth');

//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });

router.get('/', authenticate, (req, res, next) => {
  console.log('===== user!!======');

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

module.exports = router;
