const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: String,
});

module.exports = mongoose.model('Book', BookSchema);