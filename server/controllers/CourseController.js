var fs = require('fs');

module.exports.get = function(req, res) {
    var data = fs.readFileSync('data/' + req.params.filename + '.json', 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    let courses = data.split("\n");
    let json = "[";
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i].split(";");
        let courseName = course[0];
        let completeDownload = course[1];
        let lastAccessDate = course[2];
        json += '{ "courseName": "' + courseName + '", "completeDownload": "' + 
        completeDownload + '", "lastAccessDate": "' + lastAccessDate + '"}'; 
    }
    json += "]";
    res.send(json);
}