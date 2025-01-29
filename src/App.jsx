import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Login/signup";
import Header from "./components/Header";
import HomePage from "./components/HomePage/HomePage";
import videoBG from "../src/assets/videoBG.mp4";

import "./App.css";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/Signup"];

  return (
    <div className="main">
      <video src={videoBG} autoPlay loop muted />
      <div className="Routes">
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
