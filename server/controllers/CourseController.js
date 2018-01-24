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
            completedDownload: Boolean(completeDownload),
            accessDate: lastAccessDate,
            path: "",
            completedUserId: "g.deepsingh1@gmail.com",
            website: "pluralsight"
        });
        console.log(courseObject);
        courseObject.save(function(err) {
            if(err) {
                console.log(err);
                throw err;
            }
            console.log('course saved successfully');
        })
    }
}