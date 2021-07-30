document.getElementById('submit-btn').addEventListener(
    'click', createUser
)

function createUser() {
    let firstname = document.getElementById('fname').value;
    let lastname = document.getElementById('lname').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    let feedback = document.getElementById('feedback');
    if(password !== confirmPassword) {
        feedback.textContent = 'Password and confirm password are not the same.';
        feedback.style.color = 'red';
        return;
    }

    let payload = {
        "firstName": `${firstname}`,
        "lastName": `${lastname}`,
        "username": `${username}`,
        "password": `${password}`
    }

    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/users';
    request.open('POST', URI, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function() {
        if(this.status === 200) {
            console.log('CREATED');
            feedback.textContent = 'User Account Created!';
            feedback.style.color = '#21bf30';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5500/views/index.html';
            }, 2500);
        }
    }

    request.onerror = () => {
        feedback.textContent = 'Error Creating User Account!';
        feedback.style.color = 'red';
        console.log('error');
    }

    let json = JSON.stringify(payload);
    request.send(json);
}