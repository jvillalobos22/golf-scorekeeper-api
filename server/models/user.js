const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, unique: false, required: false, trim: true },
  password: { type: String, unique: false, required: false, trim: true },
  displayName: { type: String, unique: false, required: false, trim: true }
});

userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

userSchema.pre('save', function(next) {
  console.log('pre save ***************');
  if (!this.password) {
    console.log('models/user.js --- NO PASSWORD PROVIDED');
    next();
  } else {
    console.log('models/user.js --- hashPassword in pre save');
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
