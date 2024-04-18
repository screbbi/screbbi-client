import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/onboard/Login";
import Register from "./pages/onboard/Register";
import Verify from "./pages/onboard/Verify";
import Generate from "./pages/Generate";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:writer" element={<Generate />} />

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
