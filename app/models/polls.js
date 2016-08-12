var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Polls = new Schema({
    id: String,
    userId: String,
    title: String,
    options: [[String, Number]]
});

module.exports = mongoose.model('Polls', Polls);