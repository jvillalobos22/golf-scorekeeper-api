const mongoose = require("mongoose");
const { Schema } = require("mongoose");

mongoose.Promise = global.Promise; // Configure Mongoose to use built in Promise
mongoose.connect("mongodb://localhost:27017/GolfScoreApp");

const HoleSchema = new Schema({
  holeNumber: { type: Number, min: 1, max: 27 },
  par: { type: Number, min: 3, max: 5 },
  score: { type: Number, min: 1, max: 25 }
});

const MatchSchema = new Schema({
  course: {
    name: String,
    location: String,
    par: { type: Number, min: 18, max: 90 },
    holes: { type: Number, min: 1, max: 27 }
  },
  date: Date,
  holes: [HoleSchema] // { id: "1", par: 4, score: 5 }
});

const Match = mongoose.model("Match", MatchSchema);

const newMatch = new Match({
  course: {
    name: "Golden Gate Golf Course",
    location: "San Francisco, CA",
    par: 72,
    holes: 18
  },
  date: new Date(2018, 4, 17),
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
});

newMatch.save().then(
  doc => {
    console.log("Saved match", doc);
  },
  e => {
    console.log("Unable to save match");
  }
);
