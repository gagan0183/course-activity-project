var express = require('express');
var path = require('path');
var event = require('./controllers/CourseController');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var rootPath = path.normalize(__dirname + '/../');

mongoose.connect('mongodb://127.0.0.1:27017');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app/'));

app.get('/data/:filename', event.get);

app.listen(9000);
console.log('listening on port 9000');