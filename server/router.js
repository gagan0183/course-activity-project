var express = require('express');
var event = require('./controllers/CourseController');
var router = express.Router();

router.post('/addCourses/:filename', event.addCourses);
router.get('/courses', event.getCourses);
router.put('/course/:courseId', event.courseUpdate);

module.exports = router;