document.getElementById('submit-btn').addEventListener(
    'click', updateUser
)

function updateUser() {
    let firstname = document.getElementById('fname').value;
    let lastname = document.getElementById('lname').value;

    let payload = {
        "firstName": `${firstname}`,
        "lastName": `${lastname}`
    }

    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/users';
    request.open('PUT', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-Type', 'application/json');

    let feedback = document.getElementById('feedback');
    request.onload = function() {
        if(this.status === 200) {
            console.log('Updated');
            feedback.textContent = 'Updated!';
            feedback.style.color = '#21bf30';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5500/views/index.html';
            }, 2500);
        }
    }

    request.onerror = () => {
        feedback.textContent = 'Error Updating User!';
        feedback.style.color = 'red';
        console.log('error');
    }

    let json = JSON.stringify(payload);
    request.send(json);
}