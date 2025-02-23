console.log("Script loaded!");

// Global Helper Functions

// Check if the user is logged in on page load
window.onload = function () {
  const userId = localStorage.getItem("userId");

  if (userId) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
    document.getElementById("mainHeader").style.display = "block";

    fetchContacts(); // Fetch and display contacts for the logged-in user
  } else {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("mainHeader").style.display = "none";
  }
};

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
        document.getElementById("signupPage").style.display = "none";
        document.getElementById("homePage").style.display = "block";
        document.getElementById("mainHeader").style.display = "block";

        fetchContacts();
      }
    });
}

// Function to handle user signup
function signUpUser() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let login = document.getElementById("signUsername").value;
  let password = document.getElementById("signPassword").value;
  let email = document.getElementById("inputEmail").value;
  let phone = document.getElementById("inputPhoneNumber").value;
  let payload = { firstName, lastName, login, password, email, phone };

  // Validate first name
  if (firstName.trim() === "") {
    alert("First name is required.");
    return; // Prevent further execution if validation fails
  }

  // Validate password length
  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return; // Prevent further execution if validation fails
  }

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

  const friendsTab = document.getElementById("friends");
  if (friendsTab) {
    friendsTab.innerHTML = " ";
  }
}

// Function to add a contact (send to server and update UI)
function addContact() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("You must be logged in to add a contact.");
    return;
  }

  let firstName = document.getElementById("addFirstName").value.trim();
  let lastName = document.getElementById("addLastName").value.trim();
  let email = document.getElementById("addEmail").value.trim();
  let phone = document.getElementById("addPhoneNumber").value.trim();

  // Validate that all fields are filled
  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    phone.trim() === ""
  ) {
    alert("All fields must be filled out.");
    return; // Prevent further execution if validation fails
  }

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
        alert("New contact added successfully!");
        document.getElementById("addFriendsForm").reset();
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

function addContactToUI(contact) {
  const friendsTab = document.getElementById("friends");
  if (!friendsTab) {
    console.error("No element with id 'friends' found.");
    return;
  }

  // Create a new row for the contact
  let rowDiv = document.createElement("div");
  rowDiv.setAttribute("data-contact-id", contact.ID);
  // Remove vertical gap between rows by not including margin-bottom
  rowDiv.classList.add("d-flex", "justify-content-around");

  // Apply desired styling to the row
  rowDiv.style.padding = "0px";
  rowDiv.style.margin = "0px";
  rowDiv.style.width = "100%";
  rowDiv.style.gap = "0px";

  const fullName = `${contact.FirstName} ${contact.LastName}`;

  // Build the inner HTML. Here we set flex values on each column so that you can adjust their widths.
  rowDiv.innerHTML = `
    <div id="hstackContainer" class="w-100" style="border-color: #ffffff;">
      <div class="d-flex justify-content-around" style="width: 100%; gap: 0;">
         <div class="p-2 firstName" style="color: #ffffff; flex: 2; text-align: left;">${contact.FirstName}</div>
    <div class="p-2 lastName"  style="color: #ffffff; flex: 2; text-align: left;">${contact.LastName}</div>
        <div class="p-2 email" style="color: #ffffff; flex: 3; text-align: left;">${contact.Email}</div>
        <div class="p-2 phone" style="color: #ffffff; flex: 2; text-align: left;">${contact.Phone}</div>
        <div class="p-2 d-flex align-items-center" style="flex: 1; gap: 5px; justify-content: center;">
          <button class="btn btn-outline-light btn-sm edit-btn" data-contact-id="${contact.ID}" style="color: #ffffff;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-contact-id="${contact.ID}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Append the row to the "friends" container
  friendsTab.appendChild(rowDiv);
}

function editContact(contactID) {
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  let firstName = rowDiv.querySelector(".firstName").innerText;
  let lastName = rowDiv.querySelector(".lastName").innerText;
  let email = rowDiv.querySelector(".email").innerText;
  let phone = rowDiv.querySelector(".phone").innerText;

  rowDiv.innerHTML = `
    <div id="hstackContainer" class="w-100" style="border-color: #ffffff;">
      <div class="d-flex justify-content-around" style="width: 100%; gap: 0;">
        <!-- First Name input -->
        <div class="p-2" style="color: #ffffff; flex: 2; text-align: left;">
          <input type="text" class="editFirstName" value="${firstName}">
        </div>

        <!-- Last Name input -->
        <div class="p-2" style="color: #ffffff; flex: 2; text-align: left;">
          <input type="text" class="editLastName" value="${lastName}">
        </div>

        <!-- Email input -->
        <div class="p-2" style="color: #ffffff; flex: 3; text-align: left;">
          <input type="text" class="editEmail" value="${email}">
        </div>

        <!-- Phone input -->
        <div class="p-2" style="color: #ffffff; flex: 2; text-align: left;">
          <input type="text" class="editPhone" value="${phone}">
        </div>

        <!-- Action Buttons -->
        <div class="p-2 d-flex gap-2" style="flex: 1; justify-content: center;">
          <button
            class="btn btn-success btn-sm"
            onclick="saveContact(${contactID})"
          >
            Save
          </button>
          <button
            class="btn btn-secondary btn-sm"
            onclick="cancelEdit(${contactID}, '${firstName}', '${lastName}', '${email}', '${phone}')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;

  rowDiv.setAttribute("data-contact-id", contactID);
}

// Function to save updated contact information
function saveContact(contactID) {
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  let updatedFirstName = rowDiv.querySelector(".editFirstName").value;
  let updatedLastName = rowDiv.querySelector(".editLastName").value;
  let updatedEmail = rowDiv.querySelector(".editEmail").value;
  let updatedPhone = rowDiv.querySelector(".editPhone").value;

  // Validate that all fields are filled
  if (
    updatedFirstName === "" ||
    updatedLastName === "" ||
    updatedEmail === "" ||
    updatedPhone === ""
  ) {
    alert("All fields must be filled out.");
    return; // Stop execution if validation fails
  }

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
        rowDiv.innerHTML = `
      <div id="hstackContainer" class="w-100" style="border-color: #ffffff;">
        <div class="d-flex justify-content-around" style="width: 100%; gap: 0;">
          <div class="p-2 firstName" style="color: #ffffff; flex: 2; text-align: left;">${updatedFirstName}</div>
          <div class="p-2 lastName"  style="color: #ffffff; flex: 2; text-align: left;">${updatedLastName}</div>
          <div class="p-2 email"     style="color: #ffffff; flex: 3; text-align: left;">${updatedEmail}</div>
          <div class="p-2 phone"     style="color: #ffffff; flex: 2; text-align: left;">${updatedPhone}</div>
          <div class="p-2 d-flex align-items-center" style="flex: 1; gap: 5px; justify-content: center;">
            <button class="btn btn-outline-light btn-sm edit-btn" data-contact-id="${contactID}" style="color: #ffffff;">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-contact-id="${contactID}" style="color: #ffffff;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
            </button>
          </div>
        </div>
      </div>
    `;

        // Keep the same row data-attribute
        rowDiv.setAttribute("data-contact-id", contactID);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while updating the contact.");
    });
}

// Function to cancel editing and revert to original values
function cancelEdit(
  contactID,
  originalFirst,
  originalLast,
  originalEmail,
  originalPhone
) {
  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  rowDiv.innerHTML = `
          <div id="hstackContainer" class="w-100" style="border-color: #ffffff;">
        <div class="d-flex justify-content-around" style="width: 100%; gap: 0;">
          <div class="p-2 firstName" style="color: #ffffff; flex: 2; text-align: left;">${originalFirst}</div>
          <div class="p-2 lastName"  style="color: #ffffff; flex: 2; text-align: left;">${originalFirst}</div>
          <div class="p-2 email"     style="color: #ffffff; flex: 3; text-align: left;">${originalEmail}</div>
          <div class="p-2 phone"     style="color: #ffffff; flex: 2; text-align: left;">${originalPhone}</div>
          <div class="p-2 d-flex align-items-center" style="flex: 1; gap: 5px; justify-content: center;">
            <button class="btn btn-outline-light btn-sm edit-btn" data-contact-id="${contactID}" style="color: #ffffff;">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-contact-id="${contactID}" style="color: #ffffff;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
            </button>
          </div>
        </div>
      </div>
  `;
  rowDiv.setAttribute("data-contact-id", contactID);
}

function fetchContacts() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return;
  }

  // Use userId (not userID) in the URL
  fetch(`LAMPAPI/FetchContacts.php?user_id=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data); // Log full response
      const contacts = data.contacts;
      if (!Array.isArray(contacts)) {
        console.error("Expected contacts to be an array, but got:", contacts);
        return;
      }
      const friendsTab = document.getElementById("friends");
      friendsTab.innerHTML = "";
      contacts.forEach((contact) => {
        addContactToUI(contact);
      });
    })
    .catch((error) => {
      console.error("Error fetching contacts:", error);
    });
}

// Global helper function to delete a contact
function deleteContact(contactID) {
  if (!confirm("Are you sure you want to delete this contact?")) {
    return;
  }

  let rowDiv = document.querySelector(`div[data-contact-id='${contactID}']`);
  if (!rowDiv) return;

  let contactFirstName = rowDiv.querySelector(".firstName").innerText;
  let contactLastName = rowDiv.querySelector(".lastName").innerText;

  let payload = {
    userID: localStorage.getItem("userId"),
    contactFirstName: contactFirstName,
    contactLastName: contactLastName,
  };

  fetch("LAMPAPI/DeleteContacts.php", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error && data.error !== "") {
        alert("Error deleting contact: " + data.error);
      } else {
        if (rowDiv) {
          rowDiv.remove();
        }
        alert("Contact has been deleted.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the contact.");
    });
}

function searchContacts() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("You must be logged in to search contacts.");
    return;
  }

  const payload = {
    Search: searchTerm,
    UserID: parseInt(userId, 10),
  };

  fetch("LAMPAPI/SearchContacts.php", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error && data.error !== "") {
        alert("Search failed: " + data.error);
      } else {
        const contacts = data.results || [];
        const friendsTab = document.getElementById("friends");
        friendsTab.innerHTML = "";

        contacts.forEach((contact) => {
          const adaptedContact = {
            ID: contact.contactID,
            FirstName: contact.contactFirstName,
            LastName: contact.contactLastName,
            Email: contact.contactEmail,
            Phone: contact.contactPhone,
          };

          addContactToUI(adaptedContact);
        });
      }
    })
    .catch((error) => {
      console.error("Error searching contacts:", error);
      alert("An error occurred while searching for contacts.");
    });
}

// DOMContentLoaded Setup

document.addEventListener("DOMContentLoaded", function () {
  // Set up event listeners for login, signup, logout, and addFriendsForm
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loginUser();
    });

  document
    .querySelector("#signupPage form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      signUpUser();
    });

  document
    .getElementById("signUpButton")
    .addEventListener("click", function () {
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("signupPage").style.display = "block";
      document.getElementById("mainHeader").style.display = "none";
    });

  document.getElementById("logInButton").addEventListener("click", function () {
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("mainHeader").style.display = "none";
  });

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

  document
    .getElementById("searchButton")
    .addEventListener("click", function (event) {
      event.preventDefault();
      searchContacts();
    });

  const friendsTab = document.getElementById("friends");
  if (friendsTab) {
    friendsTab.addEventListener("click", function (event) {
      console.log("You clicked on friendsTab. event target:", event.target);
      const editBtn = event.target.closest(".edit-btn");
      const deleteBtn = event.target.closest(".delete-btn");
      if (editBtn) {
        console.log("Edit button was clicked!");
        editContact(editBtn.getAttribute("data-contact-id"));
      }
      if (deleteBtn) {
        console.log("Delete button was clicked!");
        deleteContact(deleteBtn.getAttribute("data-contact-id"));
      }
    });
  }

  if (localStorage.getItem("userId")) {
    fetchContacts();
  }
});
