const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
    type: String,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
},{
  timestamps: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
