var fs = require('fs');
var Course = require('./../schemas/course');

module.exports.addCourses = function(req, res) {
    var data = fs.readFileSync('data/' + req.params.filename + '.json', 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    let courses = data.split("\n");
    
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i].split(";");
        let courseName = course[0].trim();
        let completeDownload = course[1].trim();
        let lastAccessDate = course[2].trim();
        var courseObject = new Course({
            name: courseName,
            completedDownload: completeDownload,
            accessDate: lastAccessDate,
            path: "",
            completedUserId: "g.deepsingh1@gmail.com",
            website: "pluralsight"
        });
        courseObject.save(function(err) {
            if(err) {
                console.log(err);
                throw err;
            }
        })
    }
    var successMessage = {};
    successMessage.status = 200;
    successMessage.message = "Courses inserted successfully : " + courses.length;
    res.json(successMessage);
}

module.exports.getCourses = function(req, res) {
    Course.find({}, function(err, courses) {
        if(err) throw err;
        res.json(courses);
    })
}

module.exports.courseUpdate = function(req, res) {
    var courseId = req.params.courseId;
    var requestbody = req.body;
    Course.findById(courseId, function(err, course) {
        if(err) throw err;
        if(requestbody.name) {
            course.name = requestbody.name;
        }
        if(requestbody.completedDownload) {
            course.completedDownload = requestbody.completedDownload;
        }
        if(requestbody.accessDate) {
            course.accessDate = requestbody.accessDate;
        }
        if(requestbody.path) {
            course.path = requestbody.path;
        }
        if(requestbody.completedUserId) {
            course.completedUserId = requestbody.completedUserId;
        }
        if(requestbody.website) {
            course.website = requestbody.website;
        }
        course.save(course, function(err) {
            if(err) throw err;
            var updateMessage = {};
            updateMessage.status = 200;
            updateMessage.message = "Courses updated successfully : " + course.id;
            res.json(updateMessage);
        })
    });
}

module.exports.updateDataNewCourses = function(req, res) {
    var data = fs.readFileSync('data/' + req.params.filename + '.json', 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    let courses = data.split("\n");
    
    var coursesUpdateCount = 0;
    var coursesInsertCount = 0;
    for (let i = 0; i < courses.length; i++) {
        (function(i) {
            let course = courses[i].split(";");
            let courseName = course[0].trim();
            let completeDownload = course[1].trim();
            let lastAccessDate = course[2].trim();
            Course.find({ name: courseName }, function(err, course) {
                if(err) throw err;
                if(course.length > 0) {
                    Course.findOneAndUpdate({ name : courseName }, {
                        name: courseName,
                        completedDownload: completeDownload,
                        accessDate: lastAccessDate,
                        path: "",
                        completedUserId: "g.deepsingh1@gmail.com",
                        website: "pluralsight"
                    }, function(err) {
                        if(err) throw err;
                    })
                    coursesUpdateCount++;
                }
                else {
                    var courseObject = new Course({
                        name: courseName,
                        completedDownload: completeDownload,
                        accessDate: lastAccessDate,
                        path: "",
                        completedUserId: "g.deepsingh1@gmail.com",
                        website: "pluralsight"
                    });
                    coursesInsertCount++;
                    courseObject.save(function(err) {
                        if(err) {
                            console.log(err);
                            throw err;
                        }
                    });
                }
                if((coursesUpdateCount + coursesInsertCount) == courses.length) {
                    done(coursesUpdateCount, coursesInsertCount, res);
                }
            });
        })(i);
    }
}

module.exports.getNotCompletedCourses = function(req, res) {
    var data = fs.readFileSync('data/' + req.params.filename + '.json', 'utf-8');
    let courses = data.split("\n");
    res.setHeader('Content-Type', 'application/json');
    
    var coursesPresentCount = 0;
    var coursesNotPresentCount = 0;
    for (let i = 0; i < courses.length; i++) {
        (function(i) {
            let courseName = courses[i].trim();
            Course.find({ name: courseName }, function(err, course) {
                if(err) throw err;
                if(course.length > 0) {
                    coursesPresentCount++;
                }
                else {
                    console.log(courseName);
                    coursesNotPresentCount++;
                }
                if((coursesPresentCount + coursesNotPresentCount) == courses.length) {
                    done1(coursesPresentCount, coursesNotPresentCount, res);
                }
            });
        })(i);
    }
}

function done(coursesUpdateCount, coursesInsertCount, res) {
    var successMessage = {};
    successMessage.status = 200;
    successMessage.coursesUpdateCount = coursesUpdateCount;
    successMessage.coursesInsertCount = coursesInsertCount;
    res.status(200).json(successMessage);
}

function done1(coursesPresentCount, coursesNotPresentCount, res) {
    var successMessage = {};
    successMessage.status = 200;
    successMessage.coursesPresentCount = coursesPresentCount;
    successMessage.coursesNotPresentCount = coursesNotPresentCount;
    res.status(200).json(successMessage);
}