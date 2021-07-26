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

            let json = JSON.parse(request.response);
            displayUsers(json);
        }
    }

    request.onerror = () => {
        console.log('error');
    }

    request.send();
}

function displayUsers(users) {
    let tbody = document.getElementById('tbody');
    removeAllChildNodes(tbody);
    
    /*  Outline of the creation of each row.
    <tr id="data">
        <th scope="row">1</th>
        <td id="id"></td>
        <td id="fname"></td>
        <td id="lname"></td>
        <td id="username"></td>
        <td id="password"></td>
    </tr> 
    */
    for(let i = 0; i < users.length; i++) {
        let idID = `id${i + 1}`;
        let fnameID = `fname${i + 1}`;
        let lnameID = `lname${i + 1}`;
        let usernameID = `username${i + 1}`;
        let passwordID = `password${i + 1}`;
        let tableRowID = `data${i + 1}`;
        
        let tableRow = document.createElement('tr');
        tableRow.id = tableRowID;
        tbody.appendChild(tableRow);

        let rowCount = document.createElement('th');
        rowCount.setAttribute('scope', 'row');
        rowCount.textContent = i + 1;
        tableRow.appendChild(rowCount);

        let id = document.createElement('td');
        id.id = idID;
        id.textContent = users[i].Id;
        tableRow.appendChild(id);

        let fname = document.createElement('td');
        fname.id = fnameID;
        fname.textContent = users[i]['First Name'];
        tableRow.appendChild(fname);

        let lname = document.createElement('td');
        lname.id = lnameID;
        lname.textContent = users[i]['Last Name'];
        tableRow.appendChild(lname);

        let username = document.createElement('td');
        username.id = usernameID;
        username.textContent = users[i].Username;
        tableRow.appendChild(username);

        let password = document.createElement('td');
        password.id = passwordID;
        password.textContent = users[i].Password;
        tableRow.appendChild(password);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}