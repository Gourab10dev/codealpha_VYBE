const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all the details.");
        return;
    }

    // Save user information
    localStorage.setItem("vybeUserName", name);
    localStorage.setItem("vybeUserEmail", email);

    // Login successful
    window.location.href = "index.html";
});