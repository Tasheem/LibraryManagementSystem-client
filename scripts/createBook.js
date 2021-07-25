document.getElementById('submit-btn').addEventListener(
    'click', createBook
)

function createBook() {
    let name = document.getElementById('name').value;
    let authorFName = document.getElementById('authorFirstName').value;
    let authorLName = document.getElementById('authorLastName').value;

    let payload = {
        "name": `${name}`,
        "authorFirstName": `${authorFName}`,
        "authorLastName": `${authorLName}`,
        "price": `${price}`
    }

    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/books';
    request.open('POST', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        if(this.status === 201) {
            console.log('RESPONSE: ');
            console.log(request.response);
        }
    }

    request.onerror = () => {
        console.log('error');
    }

    request.send(payload);
}