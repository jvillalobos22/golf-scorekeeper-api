const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const HoleSchema = new Schema({
  holeNumber: { type: Number, min: 1, max: 27, required: true },
  par: { type: Number, min: 3, max: 5, required: true },
  score: { type: Number, min: 0, max: 25 }
});

const MatchSchema = new Schema({
  title: { type: String, trim: true, required: true },
  // user_id: {}, // foreign key to User
  // course_id: {}, // foreign key to Course
  numberHoles: {
    type: Number,
    required: true,
    validate: {
      validator: value => {
        return [6, 9, 18, 27, 36].indexOf(value) !== -1;
      },
      message: 'Value must be one of 6, 9, 18, 27, 32'
    }
  },
  // totalScore: {},
  par: { type: Number, min: 18, max: 90, required: true },
  date: { type: Date, required: true, default: new Date() },
  // timeStart: {},
  // timeEnd: {},
  // teeColor: {},
  isComplete: { type: Boolean, required: true, default: false },
  // guestPlayers: [GuestPlayersSchema],
  // scores: [ScoresSchema],
  course: {
    name: { type: String, trim: true, required: true },
    location: { type: String, trim: true },
    holes: { type: Number, min: 1, max: 27, required: true }
  },
  holes: [HoleSchema] // to be replaced by scores
});

const Match = mongoose.model('Match', MatchSchema);

// const newMatch = new Match({
// course: {
//   name: "Golden Gate Golf Course",
//   location: "San Francisco, CA",
//   par: 72,
//   holes: 18
// },
// date: new Date(2018, 4, 17),
// holes: [
//   { holeNumber: 1, par: 4, score: 4 },
//   { holeNumber: 2, par: 3, score: 3 },
//   { holeNumber: 3, par: 4, score: 4 },
//   { holeNumber: 4, par: 3, score: 4 },
//   { holeNumber: 5, par: 5, score: 5 },
//   { holeNumber: 6, par: 4, score: 4 },
//   { holeNumber: 7, par: 3, score: 4 },
//   { holeNumber: 8, par: 5, score: 5 },
//   { holeNumber: 9, par: 5, score: 4 },
//   { holeNumber: 10, par: 4, score: 4 },
//   { holeNumber: 11, par: 5, score: 5 },
//   { holeNumber: 12, par: 3, score: 3 },
//   { holeNumber: 13, par: 4, score: 4 },
//   { holeNumber: 14, par: 4, score: 5 },
//   { holeNumber: 15, par: 4, score: 5 },
//   { holeNumber: 16, par: 3, score: 3 },
//   { holeNumber: 17, par: 4, score: 5 },
//   { holeNumber: 18, par: 5, score: 5 }
// ]
// });

// const newMatch = new Match({
//   course: {
//     name: "Bidwell Park Golf Course",
//     location: "Chico, CA",
//     par: 36,
//     holes: 9
//   },
//   date: new Date(2018, 4, 17),
//   holes: [
//     { holeNumber: 1, par: 4, score: 4 },
//     { holeNumber: 2, par: 3, score: 3 },
//     { holeNumber: 3, par: 4, score: 4 },
//     { holeNumber: 4, par: 3, score: 4 },
//     { holeNumber: 5, par: 5, score: 5 },
//     { holeNumber: 6, par: 4, score: 4 },
//     { holeNumber: 7, par: 3, score: 4 },
//     { holeNumber: 8, par: 5, score: 5 },
//     { holeNumber: 9, par: 5, score: 4 }
//   ]
// });

module.exports = {
  Match
};
