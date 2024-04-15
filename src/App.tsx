import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/onboard/Login";
import Register from "./pages/onboard/Register";
import Verify from "./pages/onboard/Verify";

function App() {
  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<Verify />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
