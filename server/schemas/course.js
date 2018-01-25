var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/coursestracker');

autoIncrement.initialize(connection);
    
var courseSchema = new Schema({
    name: String,
    completedDownload: String,
    accessDate: String,
    path: String,
    completedUserId: String,
    website: String
});

courseSchema.plugin(autoIncrement.plugin, { model: 'Course', field: '_id', startAt: 1, incrementBy: 1});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;