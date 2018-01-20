var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    completedDownload: Boolean,
    accessDate: Date,
    path: String,
    completedUserId: String,
    website: String
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;