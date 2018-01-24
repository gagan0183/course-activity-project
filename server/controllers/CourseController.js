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
    Course.find({}, function(err, users) {
        if(err) throw err;
        res.json(users);
    })
}