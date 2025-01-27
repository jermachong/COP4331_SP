import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/");
  };

  return (
    <div
      className="form-container"
      style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
    >
      <form>
        <div className="signUp mb-3">
          <label htmlFor="logIn" className="form-label">
            Already have an account?
          </label>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleSignUpClick}
          >
            Log in
          </button>
        </div>
        <h1 className="mb-4">Get started managing your contacts!</h1>

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

        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
          />
          <label htmlFor="inputPassword">Password</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
