document.getElementById('sub-btn').addEventListener(
    'click', sendPUT
);

function sendPUT() {
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/books';
    request.open('PUT', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function() {
        if(this.status === 200) {
            console.log('RESPONSE: ');
            console.log(request.response);
        }
    }
    
    request.onerror = () => {
        console.log('error');
    }
    
    let bookID = window.sessionStorage.getItem('Book ID');
    window.sessionStorage.removeItem('Book ID');

    let newPrice = document.getElementById('price-input').value;

    let payload = {};
    payload.Id = bookID;
    payload.Price = newPrice;

    let json = JSON.stringify(payload);

    console.log(json);
    request.send(json);
}