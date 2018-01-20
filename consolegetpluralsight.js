//let row = document.getElementsByClassName('tableRow---3c7Vc');
//let save = "";
for(let i = 0; i < row.length; i++) {
    let course = row[i].getElementsByClassName('tableCourseLink---1pW0K');
    let completionrate = row[i].getElementsByClassName('progress-bar--green');
    let lastview = row[i].getElementsByTagName('time')[2];
    let comp = false;
	if(completionrate.length > 0) {
        comp = true;
	}
	save += "\n" + course[0].innerHTML + "; " + comp + "; " + lastview.innerHTML;
}
console.save(save);