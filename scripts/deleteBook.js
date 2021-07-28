import { getBooks } from "./getBooks.js";

export default function deleteBook(e) {
    const className = e.target.className;
    let id = className.replace(' delete', '');

    let request = new XMLHttpRequest();
    let URI = `http://localhost:4000/api/books?id=${id}`;
    request.open('DELETE', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    request.onload = function() {
        if(this.status === 200) {
            console.log('Successful delete.');
            // Reload UI with updated list.
            getBooks();
        } else if(this.status === 404) {
            console.log('404 Error');
        }
    }

    request.onerror = () => {
        console.log('error');
    }

    request.send();
}