import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/Signup");
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
        <div className="logIn mb-4 d-flex align-items-center ">
          <label
            htmlFor="logIn"
            className="form-label mb-0"
            style={{ color: "white" }}
          >
            Don't have an account yet?
          </label>
          <button
            type="button"
            className="btn custom-btn ms-2"
            style={{ color: "#ffffff" }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
        <h2 style={{ color: "white" }}>Get started managing your contacts!</h2>

        <div className="form-floating mb-4">
          <input
            type="username"
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
          <label htmlFor="InputPassword" style={{ color: "#68686E" }}>
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
          style={{ float: "right", color: "#ffffff" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
