let submit = document.getElementById('submit');

submit.addEventListener('click', function() {
	let username = document.getElementById('username').value;
	loadData();
});

function loadData() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://api.github.com/users/kdimon', true);
	xhr.send();

	if(xhr.status != 200) {
		console.log('Error '+ xhr.status + ': ' + xhr.statusText);
	}else {
		console.log(xhr.responseText);
	}
}