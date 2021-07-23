document.getElementById('button').addEventListener(
    'click', getUsers
);

function getUsers() {
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/user';
    request.open('GET', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    request.onload = function() {
        if(this.status === 200) {
            console.log('RESPONSE: ');
            console.log(request.response);
        }
    }

    request.onerror = () => {
        console.log('error');
    }

    request.send();
}