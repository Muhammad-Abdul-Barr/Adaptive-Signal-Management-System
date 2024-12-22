const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cnic: String,
    email: String,
    profilepiclink: String,
    role: { type: String, enum: ['admin', 'station'], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
