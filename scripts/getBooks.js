document.getElementById('button').addEventListener(
    'click', getBooks
);

function getBooks() {
    let request = new XMLHttpRequest();

    let URI = 'http://localhost:4000/api/books';
    request.open('GET', URI, true);

    let token = window.sessionStorage.getItem('Token');
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    request.onload = function() {
        if(this.status === 200) {
            console.log('RESPONSE: ');
            console.log(request.response);

            let json = JSON.parse(request.response);
            displayBooks(json);
        }
    }

    request.onerror = () => {
        console.log('error');
    }

    request.send();
}

function displayBooks(books) {
    let tbody = document.getElementById('tbody');
    removeAllChildNodes(tbody);
    
    /*  Outline of the creation of each row.
    <tr id="data">
        <th scope="row">1</th>
        <td id="id[i]"></td>
        <td id="name[i]"></td>
        <td id="author[i]"></td>
        <td id="price[i]"></td>
    </tr> 
    */
    for(let i = 0; i < books.length; i++) {
        let tableRowID = `data${i + 1}`;
        let idID = `id${i + 1}`;
        let nameID = `name${i + 1}`;
        let authorID = `author${i + 1}`;
        let priceID = `price${i + 1}`;
        let editDeleteElmIdentifierClass = books[i].id;
        const editStylingClass = 'edit';
        const deleteStylingClass = 'delete';
        let containerID = `container${i + 1}`;
        
        let tableRow = document.createElement('tr');
        tableRow.id = tableRowID;
        tbody.appendChild(tableRow);

        let rowCount = document.createElement('th');
        rowCount.setAttribute('scope', 'row');
        rowCount.textContent = i + 1;
        tableRow.appendChild(rowCount);

        let id = document.createElement('td');
        id.id = idID;
        id.textContent = books[i].id;
        tableRow.appendChild(id);

        let name = document.createElement('td');
        name.id = nameID;
        name.textContent = books[i].name;
        tableRow.appendChild(name);

        let author = document.createElement('td');
        author.id = authorID;
        author.textContent = books[i].authorFirstName
        + " " + books[i].authorLastName;
        tableRow.appendChild(author);

        let price = document.createElement('td');
        price.id = priceID;
        price.textContent = `$${books[i].price}`;
        tableRow.appendChild(price);

        let editDeleteContainer = document.createElement('td');
        editDeleteContainer.id = containerID;

        let editLink = document.createElement('a');
        editLink.href = 'http://127.0.0.1:5500/views/updatePrice.html';
        editLink.className = `${editDeleteElmIdentifierClass} ${editStylingClass}`;
        editLink.textContent = 'Edit/';
        editDeleteContainer.appendChild(editLink);

        let deleteLink = document.createElement('a');
        deleteLink.href = '*';
        deleteLink.className = `${editDeleteElmIdentifierClass} ${deleteStylingClass}`;
        deleteLink.textContent = 'Delete';
        editDeleteContainer.appendChild(deleteLink);
        tableRow.appendChild(editDeleteContainer);
    }

    let editArr = document.getElementsByClassName('edit');
    console.log(editArr);
    for(let i = 0; i < editArr.length; i++) {
        editArr[i].addEventListener('click', redirectToEditView)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function redirectToEditView(e) {
    const className = e.target.className;
    let id = className.replace(' edit', '');
    console.log(`ID: ${id}`);

    window.sessionStorage.setItem('Book ID', id);
}

// TODO: send delete request to API for deletion of book.
function deleteBook() {

}