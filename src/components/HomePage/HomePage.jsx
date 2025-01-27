import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container-md mt-4">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="friends-tab"
            data-bs-toggle="tab"
            data-bs-target="#friends"
            type="button"
            role="tab"
            aria-controls="friends"
            aria-selected="true"
          >
            Friends
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="search-tab"
            data-bs-toggle="tab"
            data-bs-target="#search"
            type="button"
            role="tab"
            aria-controls="search"
            aria-selected="false"
          >
            Search
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="add-friends-tab"
            data-bs-toggle="tab"
            data-bs-target="#add-friends"
            type="button"
            role="tab"
            aria-controls="add-friends"
            aria-selected="false"
          >
            Add Friends
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        {/* Friends */}
        <div
          className="tab-pane fade show active"
          id="friends"
          role="tabpanel"
          aria-labelledby="friends-tab"
        >
          <div id="hstackContainer">
            <div className="hstack gap-3">
              <div className="p-2">Name</div>
              <div className="p-2">Email</div>
              <div className="p-2">Phone Number</div>
              <div className="p-2">Actions</div>
            </div>
          </div>
        </div>
        {/* Search */}
        <div
          className="tab-pane fade"
          id="search"
          role="tabpanel"
          aria-labelledby="search-tab"
        >
          <h2>Search</h2>
          <form>
            <input
              type="text"
              placeholder="Search for friends"
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
        {/* Add Friends */}
        <div
          className="tab-pane fade"
          id="add-friends"
          role="tabpanel"
          aria-labelledby="add-friends-tab"
        >
          <h2>Add Friends</h2>
          <form>
            <div className="row g-3 mb-3">
              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>
              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
              />
              <label htmlFor="inputEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="inputPhoneNumber"
                placeholder="Phone Number"
              />
              <label htmlFor="inputPhoneNumber">Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Username"
              />
              <label htmlFor="inputUsername">Username</label>
            </div>
            <button type="submit " className="btn btn-primary mx-auto d-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
