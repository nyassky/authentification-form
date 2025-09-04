const nameInput = document.getElementById('inputName');
const surNameInput = document.getElementById('inputSurName');
const dateInput = document.getElementById('dateInput');
const emailInput = document.getElementById('emailInput');

const passwordInput = document.getElementById('passwordInput');
const repeatPasswordInput = document.getElementById('repeatPasswordInput');

const registerBtn = document.getElementById('submit-btn');

async function fetchPeople() {
	const res = await fetch("http://localhost:5500");
	await res.json();
}
async function registerPerson({nameInput, surNameInput, dateInput, emailInput, passwordInput}){
	const res = await fetch("http://localhost:5500/person", {
		method: 'POST',
		headers: {'ContentType':'application/json:charset=utf-8'},
		body: JSON.stringify({nameInput, surNameInput, dateInput, emailInput, passwordInput}),
	})
}
fetchPeople();
registerBtn.addEventListener("click", async function(event) {

	event.preventDefault();

	if (!nameInput.value || !surNameInput.value || !dateInput.value || !emailInput.value){

		alert('Please fill in all fields!')
		return;
	}else if(passwordInput.value !== repeatPasswordInput.value){

		alert('Repeat the right password!');
		return;
	}

	await registerPerson(nameInput.value, surNameInput.value, dateInput.value, emailInput.value, passwordInput.value);
})