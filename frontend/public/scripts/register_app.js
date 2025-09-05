const nameInput = document.getElementById('nameInput');
const surNameInput = document.getElementById('surNameInput');
const dateInput = document.getElementById('dateInput');
const emailInput = document.getElementById('emailInput');

const passwordInput = document.getElementById('passwordInput');
const repeatPasswordInput = document.getElementById('repeatPasswordInput');

const registerBtn = document.getElementById('register-btn');

async function registerPerson({user_name, sur_name, date_of_birth, email, password}){
	try {
		const res = await fetch("http://localhost:5500/api/person", {
			method: 'POST',
			headers: {'Content-Type':'application/json;charset=utf-8'},
			body: JSON.stringify({user_name, sur_name, date_of_birth, email, password}),
		})
		if (res.ok) {
			await res.json();
			alert('Registration successful!');
			window.location.href = '/';
		}
		else {
			alert('Registration failed: ' + res.statusText);
		}
	}catch(err){
		console.error(err);
		alert('Registration error: ', err.message);
	}
	
}
try {
	registerBtn.addEventListener("click", async function(event) {

	event.preventDefault();

	if (!nameInput.value || !surNameInput.value || !dateInput.value || !emailInput.value){
		alert('Please fill in all fields!')
		return;
	}
	if (passwordInput.value !== repeatPasswordInput.value){
		alert('Passwords do not match!');
		return;
	}	
	if (passwordInput.value.length < 8){
		alert('Password must be at least 8 chars long');
		return;
	}

	await registerPerson({
		user_name : nameInput.value, 
		sur_name : surNameInput.value, 
		date_of_birth: dateInput.value, 
		email : emailInput.value, 
		password: passwordInput.value
	});
})
}catch(err) {
	console.error(err.message);
	alert('Page loading error');
}