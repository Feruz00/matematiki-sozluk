const mongoose = require('mongoose');


const { Schema } = mongoose;

const langSchema = new Schema({
  
    short:{
        type: String,
        required: true,
        unique: true
    },
    long:{
        type: String,
        required: true,
        unique: true
    },

});


module.exports = mongoose.model('Language', langSchema);
