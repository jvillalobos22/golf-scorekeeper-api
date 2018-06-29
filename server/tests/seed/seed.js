const { ObjectID } = require('mongodb');

const { Match } = require('../../models/match');

const newMatch = {
  title: 'Super fun day golfing',
  numberHoles: 18,
  course: {
    name: 'Super Cool Golf Course 2',
    location: 'San Francisco, CA',
    holes: 18
  },
  par: 72,
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

const badMatch = {
  title: 'Bad Match',
  numberHoles: 7,
  course: {
    name: 'Super Cool Golf Course 2',
    location: 'San Francisco, CA',
    holes: 18
  },
  par: 72,
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
    { holeNumber: 9, par: 5, score: 4 }
  ]
};

const matches = [
  {
    _id: new ObjectID(),
    title: 'Super fun day golfing 2',
    par: 72,
    numberHoles: 9,
    course: {
      name: 'Super Cool Golf Course',
      location: 'San Francisco, CA',
      holes: 9
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
    title: 'Super fun day golfing 3',
    par: 72,
    numberHoles: 18,
    course: {
      name: 'Some Other Golf Course',
      location: 'San Francisco, CA',
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
  Match.remove({})
    .then(() => {
      return Match.insertMany(matches).then(() => done());
    })
    .catch(e => done(e));
};

module.exports = { matches, badMatch, newMatch, populateMatches };
