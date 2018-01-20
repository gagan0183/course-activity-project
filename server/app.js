var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var rootPath = path.normalize(__dirname + '/../');
var router = require('./router');

mongoose.connect('mongodb://127.0.0.1:27017');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app/'));
app.use('/', router);

app.listen(9000);
console.log('listening on port 9000');