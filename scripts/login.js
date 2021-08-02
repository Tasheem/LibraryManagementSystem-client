document.getElementById('login').addEventListener(
    'click', submitForm
)

document.addEventListener('keydown', catchEnter) 

function catchEnter(e) {
    if(e.key === 'Enter') {
        submitForm();
    }
}

function submitForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    console.log(username);
    console.log(password);

    let request = new XMLHttpRequest();
    let URI = 'http://localhost:4000/api/login';
    request.open('POST', URI, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.withCredentials = true;

    let payload = {
        "username": `${username}`,
        "password": `${password}`
    }
    
    let feedback = document.getElementById('feedback');
    request.onload = function() {
        if(this.status === 200) {
            let resBody = this.response;
            let authHeader = this.getResponseHeader('Authorization');
            let token = authHeader.replace('Bearer ', '');
            window.sessionStorage.setItem('Token', token);
            console.log(resBody);
            
            feedback.textContent = 'Logging In...';
            feedback.style.color = '#37fc72';
            setTimeout(() => {
                window.location = 'http://127.0.0.1:5500';
            }, 2500);
        } else if(this.status === 401) {
            feedback.textContent = 'Incorrect Username or Password';
            feedback.style.color = 'red';
        } else {
            feedback.textContent = 'Error Logging In';
            feedback.style.color = 'red';
        }
    }

    request.onerror = () => {
        feedback.textContent = 'Error';
        feedback.style.color = 'red';
        console.log('error');
    }

    let json = JSON.stringify(payload);
    request.send(json);
}

/* function readURL(input) {
    document.getElementById("img").style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('bannerImg').src =  e.target.result;
        }

        let blob = reader.readAsDataURL(input.files[0]);
        console.log(blob)
    }
} */

/* function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function loadImage(dataImage) {
    let load = document.createElement('img');
    load.src = "data:image/png;base64," + dataImage;
} */