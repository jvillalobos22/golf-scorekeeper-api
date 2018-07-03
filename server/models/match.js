const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const HoleSchema = new Schema({
  holeNumber: { type: Number, min: 1, max: 27, required: true },
  par: { type: Number, min: 3, max: 5, required: true },
  score: { type: Number, min: 0, max: 25 },
  // handicap: {},
  // yardage: {},
  teeDirection: {
    type: String,
    validate: {
      validator: value => {
        return ['LEFT', 'RIGHT', 'CENTER', '-'].indexOf(value) !== -1;
      },
      message: 'Value must be one of LEFT, RIGHT, CENTER'
    }
  },
  putts: { type: Number, min: 0, max: 25 },
  mulligans: { type: Number, min: 0, max: 25 }
  // timeStart: {},
  // timeEnd: {},
  // guestScores: {GuestScoresSchema}
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

module.exports = {
  Match
};
