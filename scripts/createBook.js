document.getElementById('submit-btn').addEventListener(
    'click', createBook
)

function createBook() {
    let name = document.getElementById('name').value;
    let authorFName = document.getElementById('authorFirstName').value;
    let authorLName = document.getElementById('authorLastName').value;
    let price = document.getElementById('price').value;

    let payload = {
        "name": `${name}`,
        "authorFirstName": `${authorFName}`,
        "authorLastName": `${authorLName}`,
        "price": parseFloat(price)
    }

    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/books';
    request.open('POST', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-Type', 'application/json');

    let feedback = document.getElementById('feedback');
    request.onload = function() {
        if(this.status === 201) {
            console.log('CREATED');
            feedback.textContent = 'Book Created!';
            feedback.style.color = '#21bf30';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5500/views/index.html';
            }, 2500);
        }
    }

    request.onerror = () => {
        feedback.textContent = 'Error Creating Book!';
        feedback.style.color = 'red';
        console.log('error');
    }

    let json = JSON.stringify(payload);
    request.send(json);
}