const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { ObjectID } = require('mongodb');

const { mongoose } = require('../db/mongoose');
const { Match } = require('../models/match');
const { authenticate } = require('../middleware/authenticate');

// POST /matches
router.post('/', authenticate, (req, res) => {
  const match = new Match({ _creator: req.user._id, ...req.body });

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
router.get('/', authenticate, (req, res) => {
  Match.find({
    _creator: req.user._id
  })
    .then(matches => {
      res.send({ matches });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// DELETE /matches/:id
router.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Match.findOneAndRemove({
    _id: id,
    _creator: req.user._id
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
router.patch('/:id', authenticate, (req, res) => {
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

  Match.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(match => {
      if (!match) {
        return res.status(404).send();
      }
      res.send({ match });
    })
    .catch(e => res.status(400).send());
});

module.exports = router;
