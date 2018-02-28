var list = document.getElementsByClassName('courseLink---r8Cgr');
var save = "";
for(let i = 0; i < list.length; i++) {
	save += list[i].innerHTML + "\n";
}
console.save(save);