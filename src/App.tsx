import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/onboard/Login";
import Register from "./pages/onboard/Register";
import Verify from "./pages/onboard/Verify";
import Generate from "./pages/Generate";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import PaymentSuccess from "./pages/PaymentSuccess";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

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
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

        <Route path="/billing" element={<Billing />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policies" element={<PrivacyPolicy />} />

        <Route path="/generate/:writer" element={<Generate />} />
        <Route path="/project/:project/:writer" element={<Generate />} />
        <Route path="/project/:project/" element={<Generate />} />

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
