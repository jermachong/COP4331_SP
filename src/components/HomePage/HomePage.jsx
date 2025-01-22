import React from "react";
import "./Homepage.css";

const HomePage = () => {
  return (
    <div>
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel">
                      Add New Contact
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row g-2">
                        <div className="col-md">
                          <div className="form-floating">
                            <input
                              type="firstName"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                            />
                            <label htmlFor="inputFirstName">First Name</label>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="form-floating">
                            <input
                              type="firstName"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                            />
                            <label htmlFor="inputLastName">Last Name</label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit "
                        className="btn btn-primary mx-auto d-block"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <form className="d-flex w-75 p-3" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            > */}
            <button type="button" class="btn btn-primary">
              Delete
            </button>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Name
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Email
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Phone Number
                  </a>
                </li>
              </ul>
            </li> */}
            {/* </div> */}
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div id="hstackContainer">
        <div className="hstack gap-3">
          <div className="p-2">Name</div>
          <div className="p-2">Email</div>
          <div className="p-2">Phone Number</div>
          <div className="p-2">Actions</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
