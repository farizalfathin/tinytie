import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ContactUs from "./pages/contactus";
import TermsOfService from "./pages/termsofservice";
import PrivacyPolicy from "./pages/privacypolicy";
import Account from "./pages/account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
