const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please tell us your name'],
  },
  username: {
    type: String,
    required: [true, 'Please provide your username'],
    unique: [true, 'username already have'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    select: false,
  },
});

// instance method, method thats gonna be available for all document in collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // return true jika cocok
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
