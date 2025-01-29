function router(hash) {
  let routeName = hash.replace("#/", "");

  if (!routeName) {
    routeName = "login";
  }
  //hide all pages
  const pages = ["loginPage", "homePage", "signupPage"];
  pages.forEach((id) => {
    const page = document.getElementById(id);
    if (page) page.style.display = "none";
  });

  // hide header when at log in or sign up
  const mainHeader = document.getElementById("mainHeader");
  if (mainHeader) {
    if (routeName === "login" || routeName === "signup") {
      mainHeader.style.display = "none";
    } else {
      mainHeader.style.display = "block";
    }
  }

  // display page
  const activePage = document.getElementById(routeName + "Page");
  if (activePage) {
    activePage.style.display = "block";
  } else {
    // If the route is invalid, send them back to login
    window.location.hash = "#/login";
  }
}
//initialize app
function initApp() {
  if (!window.location.hash) {
    window.location.hash = "#/";
  }
  router(window.location.hash);
}

window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

// handle Login form submission
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Login submitted!");
  //add in login verification
  window.location.hash = "#/home";
});

document.addEventListener("DOMContentLoaded", () => {
  // "Temporary Home Page" button until back end is connected
  document.getElementById("tempHomeLink").addEventListener("click", () => {
    window.location.hash = "#/home";
  });

  document.getElementById("logOutButton").addEventListener("click", () => {
    window.location.hash = "#/";
  });

  // "Sign Up" button from Login
  document.getElementById("signUpButton").addEventListener("click", () => {
    window.location.hash = "#/signup";
  });
});

// handle new contact Friends form submission
const addFriendsForm = document.getElementById("addFriendsForm");
addFriendsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submitted add friend");
});

// handle search form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submitted search");
});

initApp();
