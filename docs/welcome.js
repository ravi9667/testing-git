const userDataString = localStorage.getItem("userData");

if (userDataString) {
    const userData = JSON.parse(userDataString);
    document.getElementById("welcome-name").innerHTML = `<b>${userData.name}</b>`;
    document.getElementById("welcome-email").innerHTML = `<b>${userData.email}</b>`;
    document.getElementById("welcome-phNumber").innerHTML = `<b>${userData.phoneNumber}</b>`;
} else {
    // Redirect to login if user data not found
    window.location.href = "http://127.0.0.1:5500/login.html";
}
