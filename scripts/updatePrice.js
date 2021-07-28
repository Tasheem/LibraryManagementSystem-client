document.getElementById('sub-btn').addEventListener(
    'click', sendPUT
);

function sendPUT() {
    let newPrice = document.getElementById('price-input').value;
    let feedback = document.getElementById('feedback');
    if(isNaN(newPrice)) {
        feedback.textContent = 'Value must be a number';
        feedback.style.color = 'red';
        return;
    }
    
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/books';
    request.open('PUT', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function() {
        if(this.status === 200) {
            feedback.textContent = 'Price Successfully Updated!';
            feedback.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5500/views/index.html';
            }, 2500);
        }
    }
    
    request.onerror = () => {
        console.log('error');
        feedback.textContent = 'Error Updating!';
        feedback.style.color = 'red';
    }
    
    let bookID = window.sessionStorage.getItem('Book ID');
    window.sessionStorage.removeItem('Book ID');

    let payload = {};
    payload.id = bookID;
    payload.price = parseFloat(newPrice);

    let json = JSON.stringify(payload);

    // console.log(json);
    request.send(json);
}