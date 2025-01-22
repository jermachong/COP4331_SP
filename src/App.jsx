import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Login/signup";
import Header from "./components/Header";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
