var express = require('express');
var event = require('./controllers/CourseController');
var router = express.Router();

router.post('/addCourses/:filename', event.addCourses);

module.exports = router;