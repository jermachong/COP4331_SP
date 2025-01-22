import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/Signup");
  };

  return (
    <div className="form-container">
      <form>
        <div className="logIn">
          <label htmlFor="logIn" className="form-label">
            Don't have an account yet?
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
        <h1>Get started managing your contacts!</h1>
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

export default Login;
