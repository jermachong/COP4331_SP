import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <form>
        <div className="signUp">
          <label htmlFor="logIn" className="form-label">
            Already have an account?
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignUpClick}
          >
            Log in
          </button>
        </div>
        <h1>Get started managing your contacts!</h1>
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
        <div className="form-floating mb-3">
          <input
            type="username"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
          />
          <label htmlFor="inputUsername">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
          />
          <label htmlFor="InputPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
