var express = require('express');
var event = require('./controllers/CourseController');
var router = express.Router();

router.post('/addCourses/:filename', event.addCourses);
router.get('/courses', event.getCourses);
router.put('/course/:courseId', event.courseUpdate);
router.put('/updatecourses/:filename', event.updateDataNewCourses);

module.exports = router;