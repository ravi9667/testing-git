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

        window.location.href = "http://127.0.0.1:5500/index.html";

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
        // console.log(data.data)

        if (data && data.ok === true && data.data) {
            console.log("Redirecting to welcome.html...");
            localStorage.setItem("userData", JSON.stringify(data.data));
            window.location.href = "http://127.0.0.1:5500/Frontend/welcome.html";
        }

    } catch(err) {
        console.log(err)
    }
}

let btn = document.querySelectorAll(".login-btn");
btn.forEach((a) => {
    let btnWidth = a.offsetWidth;        // get button width
    let spanWidth = 2;                   // each span is 2px wide
    let count = Math.ceil(btnWidth / spanWidth); // how many spans needed

    for (let i = 0; i < count; i++) {
        let span = document.createElement("span");
        span.style.left = `${i * spanWidth}px`;
        span.style.width = spanWidth + "px"; // ensure fixed width
        a.append(span);

        // add random delay for animation
        let random = Math.random(); // between 0–1
        span.style.transitionDelay = random + "s";    
    }
 });