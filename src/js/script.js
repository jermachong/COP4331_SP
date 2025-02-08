console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", function () {
  // Login form submit event listener
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loginUser();
    });

  // Signup form submit event listener
  document
    .querySelector("#signupPage form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      signUpUser();
    });

  // "Sign Up" button on login page (navigates to signup section)
  document
    .getElementById("signUpButton")
    .addEventListener("click", function () {
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("signupPage").style.display = "block";
      document.getElementById("mainHeader").style.display = "none";
    });

  // "Log In" button on signup page (navigates to login section)
  document.getElementById("logInButton").addEventListener("click", function () {
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("mainHeader").style.display = "none";
  });

  // Logout button
  document
    .getElementById("logOutButton")
    .addEventListener("click", function () {
      logoutUser();
    });

  document
    .getElementById("addFriendsForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      addContact();
    });
});

// Function to handle user login
function loginUser() {
  let login = document.getElementById("inputUsername").value;
  let password = document.getElementById("inputPassword").value;

  let payload = { Username: login, Password: password };

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
        localStorage.setItem("userId", data.userID);
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("homePage").style.display = "block";
        document.getElementById("mainHeader").style.display = "block";
      }
    });
}

// Function to handle user signup (with email and phone number)
function signUpUser() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let login = document.getElementById("signUsername").value;
  let password = document.getElementById("signPassword").value;
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
        document.getElementById("mainHeader").style.display = "none";
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

function addContact() {
  // Get userId of the logged in user
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("You must be logged in to add a contact.");
    return;
  }

  // Gather form data
  let firstName = document.getElementById("addFirstName").value.trim();
  let lastName = document.getElementById("addLastName").value.trim();
  let email = document.getElementById("addEmail").value.trim();
  let phone = document.getElementById("addPhoneNumber").value.trim();

  // prepare payload
  let payload = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Phone: phone,
    UserID: userId,
  };

  // send post request to add new contact
  fetch("LAMPAPI/AddContacts.php", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Failed to add contact: " + data.error);
      } else {
        alert("New contact added successfully!");
        document.getElementById("addFriendsForm").reset();

        fetchContacts();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    });
}
function fetchContacts() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    // Not logged in
    return;
  }
  // Call the GET endpoint with the user_id query parameter
  fetch(`LAMPAPI/fetchContact.php?user_id=${userId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((contacts) => {
      // Get the container element defined in index.html
      const friendsTab = document.getElementById("friends");
      // Clear existing contacts
      friendsTab.innerHTML = "";
      // Loop through the contacts array and build the UI
      contacts.forEach((contact) => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("d-flex", "justify-content-around", "mb-2");
        rowDiv.innerHTML = `
          <div class="p-2">${contact.FirstName} ${contact.LastName}</div>
          <div class="p-2">${contact.Email}</div>
          <div class="p-2">${contact.Phone}</div>
          <div class="p-2 d-flex gap-2">
            <button class="btn btn-outline-light btn-sm" onclick="editContact(${contact.ID})">
              <i class="bi bi-pencil-square" style="color: #ffffff"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.ID})">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        `;
        friendsTab.appendChild(rowDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching contacts:", error);
      alert("An error occurred while fetching contacts.");
    });
}
