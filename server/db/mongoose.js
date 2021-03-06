const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Configure Mongoose to use built in Promise
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/GolfScoreApp'
);

module.exports = {
  mongoose
};
