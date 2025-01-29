import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/");
  };

  const handleTempClick = () => {
    navigate("/HomePage");
  };

  return (
    <div
      className="form-container"
      style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
    >
      <form>
        <div className="signUp mb-3">
          <label
            htmlFor="logIn"
            className="form-label"
            style={{ color: "#ffffff" }}
          >
            Already have an account?
          </label>
          <button
            type="button"
            className="btn custom-btn ms-2"
            onClick={handleSignUpClick}
          >
            Log in
          </button>
        </div>
        <h2 className="mb-4" style={{ color: "#ffffff" }}>
          Get started managing your contacts!
        </h2>

        <div className="row g-3 mb-3">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
              />
              <label htmlFor="firstName" style={{ color: "#68686E" }}>
                First Name
              </label>
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
              <label htmlFor="lastName" style={{ color: "#68686E" }}>
                Last Name
              </label>
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
          <label htmlFor="inputEmail" style={{ color: "#68686E" }}>
            Email
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputPhoneNumber"
            placeholder="Phone Number"
          />
          <label htmlFor="inputPhoneNumber" style={{ color: "#68686E" }}>
            Phone Number
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
          />
          <label htmlFor="inputUsername" style={{ color: "#68686E" }}>
            Username
          </label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
          />
          <label htmlFor="inputPassword" style={{ color: "#68686E" }}>
            Password
          </label>
        </div>
        <button
          type="button"
          className="btn custom-btn ms-2"
          onClick={handleTempClick}
        >
          Temporary Home Page link
        </button>
        <button
          type="submit"
          className="btn custom-btn mb-3"
          style={{ float: "right" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
