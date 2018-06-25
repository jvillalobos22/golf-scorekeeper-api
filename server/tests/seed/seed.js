const { ObjectID } = require('mongodb');

const { Match } = require('../../models/match');

const newMatch = {
  course: {
    name: 'Super Cool Golf Course 2',
    location: 'San Francisco, CA',
    par: 72,
    holes: 18
  },
  date: new Date('6/11/2018'),
  holes: [
    { holeNumber: 1, par: 4, score: 4 },
    { holeNumber: 2, par: 3, score: 3 },
    { holeNumber: 3, par: 4, score: 4 },
    { holeNumber: 4, par: 3, score: 4 },
    { holeNumber: 5, par: 5, score: 5 },
    { holeNumber: 6, par: 4, score: 4 },
    { holeNumber: 7, par: 3, score: 4 },
    { holeNumber: 8, par: 5, score: 5 },
    { holeNumber: 9, par: 5, score: 4 },
    { holeNumber: 10, par: 4, score: 4 },
    { holeNumber: 11, par: 5, score: 5 },
    { holeNumber: 12, par: 3, score: 3 },
    { holeNumber: 13, par: 4, score: 4 },
    { holeNumber: 14, par: 4, score: 5 },
    { holeNumber: 15, par: 4, score: 5 },
    { holeNumber: 16, par: 3, score: 3 },
    { holeNumber: 17, par: 4, score: 5 },
    { holeNumber: 18, par: 5, score: 5 }
  ]
};

const matches = [
  {
    _id: new ObjectID(),
    course: {
      name: 'Super Cool Golf Course',
      location: 'San Francisco, CA',
      par: 72,
      holes: 18
    },
    date: new Date('11/11/2018'),
    holes: [
      { holeNumber: 1, par: 4, score: 4 },
      { holeNumber: 2, par: 3, score: 3 },
      { holeNumber: 3, par: 4, score: 4 },
      { holeNumber: 4, par: 3, score: 4 },
      { holeNumber: 5, par: 5, score: 5 },
      { holeNumber: 6, par: 4, score: 4 },
      { holeNumber: 7, par: 3, score: 4 },
      { holeNumber: 8, par: 5, score: 5 },
      { holeNumber: 9, par: 5, score: 4 },
      { holeNumber: 10, par: 4, score: 4 },
      { holeNumber: 11, par: 5, score: 5 },
      { holeNumber: 12, par: 3, score: 3 },
      { holeNumber: 13, par: 4, score: 4 },
      { holeNumber: 14, par: 4, score: 5 },
      { holeNumber: 15, par: 4, score: 5 },
      { holeNumber: 16, par: 3, score: 3 },
      { holeNumber: 17, par: 4, score: 5 },
      { holeNumber: 18, par: 5, score: 5 }
    ]
  },
  {
    _id: new ObjectID(),
    course: {
      name: 'Some Other Golf Course',
      location: 'San Francisco, CA',
      par: 72,
      holes: 18
    },
    date: new Date('11/12/2018'),
    holes: [
      { holeNumber: 1, par: 4, score: 4 },
      { holeNumber: 2, par: 3, score: 3 },
      { holeNumber: 3, par: 4, score: 4 },
      { holeNumber: 4, par: 3, score: 4 },
      { holeNumber: 5, par: 5, score: 5 },
      { holeNumber: 6, par: 4, score: 4 },
      { holeNumber: 7, par: 3, score: 4 },
      { holeNumber: 8, par: 5, score: 5 },
      { holeNumber: 9, par: 5, score: 4 },
      { holeNumber: 10, par: 4, score: 4 },
      { holeNumber: 11, par: 5, score: 5 },
      { holeNumber: 12, par: 3, score: 3 },
      { holeNumber: 13, par: 4, score: 4 },
      { holeNumber: 14, par: 4, score: 5 },
      { holeNumber: 15, par: 4, score: 5 },
      { holeNumber: 16, par: 3, score: 3 },
      { holeNumber: 17, par: 4, score: 5 },
      { holeNumber: 18, par: 5, score: 5 }
    ]
  }
];

const populateMatches = done => {
  Match.remove({}).then(() => {
    return Match.insertMany(matches).then(() => done());
  });
};

module.exports = { matches, newMatch, populateMatches };
