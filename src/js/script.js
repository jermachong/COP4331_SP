console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", function () {
    // Login form submit event listener
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        loginUser();
    });

    // Signup form submit event listener
    document.querySelector("#signupPage form").addEventListener("submit", function (event) {
        event.preventDefault();
        signUpUser();
    });

    // "Sign Up" button on login page (navigates to signup section)
    document.getElementById("signUpButton").addEventListener("click", function () {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("signupPage").style.display = "block";
    });

    // "Log In" button on signup page (navigates to login section)
    document.getElementById("logInButton").addEventListener("click", function () {
        document.getElementById("signupPage").style.display = "none";
        document.getElementById("loginPage").style.display = "block";
    });

    // Logout button
    document.getElementById("logOutButton").addEventListener("click", function () {
        logoutUser();
    });
});

// Function to handle user login
function loginUser() {
    let login = document.getElementById("inputUsername").value;
    let password = document.getElementById("inputPassword").value;

    let payload = { login: login, password: password };

    fetch("LAMPAPI/Login.php", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert("Login failed: " + data.error);
            } else {
                alert("Login successful!");
                localStorage.setItem("userId", data.id);
                document.getElementById("loginPage").style.display = "none";
                document.getElementById("homePage").style.display = "block";
            }
        })

}

// Function to handle user signup (with email and phone number)
function signUpUser() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let login = document.getElementById("inputUsername").value;
    let password = document.getElementById("inputPassword").value;
    let email = document.getElementById("inputEmail").value;
    let phone = document.getElementById("inputPhoneNumber").value;

    let payload = { firstName, lastName, login, password, email, phone };

    fetch("LAMPAPI/SignUp.php", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert("Signup failed: " + data.error);
            } else {
                alert("Signup successful! You can now log in.");
                document.getElementById("signupPage").style.display = "none";
                document.getElementById("loginPage").style.display = "block";
            }
        })
        .catch((error) => console.error("Error:", error));
}

// Function to handle user logout
function logoutUser() {
    localStorage.removeItem("userId");
    alert("Logged out successfully.");
    document.getElementById("homePage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}
