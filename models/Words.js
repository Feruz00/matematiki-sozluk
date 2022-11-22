const mongoose = require('mongoose');


const { Schema } = mongoose;

const wordSchema = new Schema({
    word: Object
});


module.exports = mongoose.model('Word', wordSchema);
