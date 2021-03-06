const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  uni: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  defaultPortfolio: {
    type: String,
    required: false
  },
  eventPortfolio: {
    type: String,
    required: false
  },
  portraitPortfolio: {
    type: String,
    required: false
  }
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
