var express = require('express');
var event = require('./controllers/CourseController');
var router = express.Router();

router.get('/data/:filename', event.get);

module.exports = router;