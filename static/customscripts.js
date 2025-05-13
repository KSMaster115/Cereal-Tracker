function checkregister(){
    let username = document.querySelector('#newusername').value;
    let password = document.querySelector('#newpassword').value;

    fetch('/registration', 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newusername:username, newpassword:password})
    })

    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function openPopup(){
    document.getElementById('loginbox').style.display = 'block';
}

function checklogin(){
    let username = document.querySelector('#loginusername').value;
    let password = document.querySelector('#loginpassword').value;
    fetch("/loginsubmit",
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({loginusername:username, loginpassword:password})
    })

    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Username or Password entered was wrong.');
        }
    })
    .then(data => {
        alert(data.message);
        document.getElementById('loginbox').style.display = 'none';
    })
    .catch(error => {
        alert(error.message);
        console.error('Error:', error);
    })
}