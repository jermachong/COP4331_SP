import React from "react";
import "./Homepage.css";

const HomePage = () => {
  return (
    <div id="hstackContainer">
      <div className="hstack gap-3">
        <div className="p-2">Name</div>
        <div className="p-2">Email</div>
        <div className="p-2">Phone Number</div>
        <div className="p-2">Actions</div>
      </div>
    </div>
  );
};

export default HomePage;
