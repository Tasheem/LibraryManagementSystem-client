document.getElementById('button').addEventListener(
    'click', redirect
);

function redirect() {
    window.location.href = 'http://127.0.0.1:5500/views/getUsers.html';
}

