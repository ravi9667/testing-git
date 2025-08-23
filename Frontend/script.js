async function postData(url, apiData) {
    let data = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(apiData)
    });

    let response = await data.json();
    return response;
}

async function addData() {
    try {

        let name = document.getElementById('signup-name');
        let email = document.getElementById('signup-email');
        let password = document.getElementById('signup-password');
        let phoneNumber = document.getElementById("signup-phoneNum");
        
        console.log(name, email, password, phoneNumber)
        
        let apiData = {
            name: name.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value
        }
        
        let data = await postData("http://127.0.0.1:6060/signUp", apiData)
        alert(data?.message)

        window.location.href = "http://127.0.0.1:5500/login.html";

    } catch(err) {
        console.log(err) 
    }
}

async function getData(url, apiData) {
    let data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(apiData)
    });
    let response = await data.json();
    return response
}


async function loginFetchData() {
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Show loader
    try {
        let login_email = document.getElementById('login-email');
        console.log(login_email)
        let login_password = document.getElementById("login-password");
        
        let apiData = {
            email: login_email.value,
            password: login_password.value
        }
        let data = await getData("http://127.0.0.1:6060/login", apiData);
        alert(data?.message);

        localStorage.setItem("userData", JSON.stringify(data.data));  // Save user data
        window.location.href = "http://127.0.0.1:5500/welcome.html";

    } catch(err) {
        console.log(err)
    }
}