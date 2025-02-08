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

  const friendsTab = document.getElementById("friends");
  if (friendsTab) {
    friendsTab.addEventListener("click", function (event) {
      const editBtn = event.target.closest(".edit-btn");
      if (editBtn) {
        const contactID = editBtn.getAttribute("data-contact-id");
        editContact(contactID);
        return;
      }
      const deleteBtn = event.target.closest(".delete-btn");
      if (deleteBtn) {
        const contactID = deleteBtn.getAttribute("data-contact-id");
        deleteContact(contactID);
        return;
      }
    });
  }
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

  let payload = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Phone: phone,
    UserID: userId,
  };

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
        // data.id is the newly inserted contact's ID
        alert("New contact added successfully!");
        document.getElementById("addFriendsForm").reset();

        // Insert the new contact into the UI
        const newContact = {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Phone: phone,
          ID: data.id, // from AddContacts.php
        };
        addContactToUI(newContact);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the contact.");
    });
}

// Add this helper function
function addContactToUI(contact) {
  const friendsTab = document.getElementById("friends");
  console.log("friendsTab:", friendsTab); // Check if this logs null or the element

  if (!friendsTab) {
    console.error("No element with id 'friends' found.");
    return;
  }
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("d-flex", "justify-content-around", "mb-2");

  rowDiv.innerHTML = `
    <div class="p-2 firstName">${contact.FirstName} ${contact.LastName}</div>
    <div class="p-2 email">${contact.Email}</div>
    <div class="p-2 phone">${contact.Phone}</div>
    <div class="p-2 d-flex gap-2">
      <button class="btn btn-outline-light btn-sm" onclick="editContact(${contact.ID})">
        <i class="bi bi-pencil-square" style="color: #ffffff"></i>
      </button>
      <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.ID})">
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>
  `;

  // Append the newly created row to your existing list
  friendsTab.appendChild(rowDiv);
}

function editContact(contactID) {
  // Find the row element for the contact using a data attribute
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  // Get the current values
  let firstName = rowDiv.querySelector(".firstName").innerText;
  let lastName = rowDiv.querySelector(".lastName").innerText;
  let email = rowDiv.querySelector(".email").innerText;
  let phone = rowDiv.querySelector(".phone").innerText;

  // Replace static text with input fields for editing
  rowDiv.innerHTML = `
    <div class="p-2"><input type="text" class="editFirstName" value="${firstName}"></div>
    <div class="p-2"><input type="text" class="editLastName" value="${lastName}"></div>
    <div class="p-2"><input type="text" class="editEmail" value="${email}"></div>
    <div class="p-2"><input type="text" class="editPhone" value="${phone}"></div>
    <div class="p-2 d-flex gap-2">
      <button class="btn btn-success btn-sm" onclick="saveContact(${contactID})">Save</button>
      <button class="btn btn-secondary btn-sm" onclick="cancelEdit(${contactID}, '${firstName}', '${lastName}', '${email}', '${phone}')">Cancel</button>
    </div>
  `;
}

function saveContact(contactID) {
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  // Collect updated values from the input fields
  let updatedFirstName = rowDiv.querySelector(".editFirstName").value;
  let updatedLastName = rowDiv.querySelector(".editLastName").value;
  let updatedEmail = rowDiv.querySelector(".editEmail").value;
  let updatedPhone = rowDiv.querySelector(".editPhone").value;

  // Create payload that matches updateContacts.php expectations
  let payload = {
    contactFirstName: updatedFirstName,
    contactLastName: updatedLastName,
    contactEmail: updatedEmail,
    contactPhone: updatedPhone,
    contactID: contactID,
  };
  fetch("LAMPAPI/UpdateContacts.php", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error updating contact: " + data.error);
      } else {
        // Update succeeded; update the row with static text
        rowDiv.innerHTML = `
        <div class="p-2 firstName">${updatedFirstName}</div>
        <div class="p-2 lastName">${updatedLastName}</div>
        <div class="p-2 email">${updatedEmail}</div>
        <div class="p-2 phone">${updatedPhone}</div>
        <div class="p-2 d-flex gap-2">
          <button class="btn btn-outline-light btn-sm" onclick="editContact(${contactID})">
            <i class="bi bi-pencil-square" style="color: #ffffff"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteContact(${contactID})">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      `;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while updating the contact.");
    });
}

function cancelEdit(
  contactID,
  originalFirst,
  originalLast,
  originalEmail,
  originalPhone
) {
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  // Revert the row to the original values (static text)
  rowDiv.innerHTML = `
    <div class="p-2 firstName">${originalFirst}</div>
    <div class="p-2 lastName">${originalLast}</div>
    <div class="p-2 email">${originalEmail}</div>
    <div class="p-2 phone">${originalPhone}</div>
    <div class="p-2 d-flex gap-2">
      <button class="btn btn-outline-light btn-sm" onclick="editContact(${contactID})">
        <i class="bi bi-pencil-square" style="color: #ffffff"></i>
      </button>
      <button class="btn btn-danger btn-sm" onclick="deleteContact(${contactID})">
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>
  `;
}
