document.getElementById('delete-account').addEventListener(
    'click', () => {
        let yes = confirm('This action will result in permanent deletion. Are you sure you want to delete this account?');
        console.log(`Answer: ${yes}`);
        if(yes) {
            let request = new XMLHttpRequest();
            let URI = `http://localhost:4000/api/users`;
            request.open('DELETE', URI, true);

            let token = window.sessionStorage.getItem('Token');
            request.setRequestHeader('Authorization', 'Bearer ' + token);

            request.onload = function() {
                if(this.status === 200) {
                    console.log('Successful delete.');
                    window.sessionStorage.removeItem('Token');
                    window.location.href = 'http://127.0.0.1:5500/views/index.html';
                } else {
                    alert('There was an error deleting your account.');
                }
            }

            request.onerror = () => {
                console.log('error');
                alert('There was an error deleting your account.');
            }

            request.send();
        }
    }
)