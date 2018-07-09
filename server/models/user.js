const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

// TODO: refactor username to email
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: false,
    trim: true,
    minlength: 1
  },
  password: { type: String, required: true, trim: true, minlength: 3 },
  displayName: { type: String, required: false, trim: true },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
  toJSON: function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'username', 'displayName']);
  },
  generateAuthToken: function() {
    const user = this;
    const access = 'auth';
    const token = jwt
      .sign(
        {
          _id: user._id.toHexString(),
          access
        },
        'abc123' // TODO: replace with env variable
      )
      .toString();

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
      return token;
    });
  }
};

userSchema.statics = {
  findByToken: function(token) {
    const User = this;
    let decoded;

    try {
      decoded = jwt.verify(token, 'abc123'); // TODO: replace with env variable
    } catch (e) {
      return Promise.reject();
    }

    return User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  }
};

userSchema.pre('save', function(next) {
  const user = this;

  console.log('pre save ***************');
  if (!this.password) {
    console.log('models/user.js --- NO PASSWORD PROVIDED');
    next();
  } else {
    if (user.isModified('password')) {
      console.log('models/user.js --- hashPassword in pre save');
      this.password = this.hashPassword(this.password);
    }
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
