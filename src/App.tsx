import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ContactUs from "./pages/contact-us";
import TermsOfService from "./pages/terms-of-service";
import PrivacyPolicy from "./pages/privacy-policy";
import DetailPost from "./pages/detail-post";
import AccountMe from "./pages/account-me";
import OtherAccount from "./pages/outher-account";
import EditProfile from "./pages/edit-profile";
import Explore from "./pages/explore";
import NewPost from "./pages/new-post";
import EditPost from "./pages/edit-post";
import Chat from "./pages/chat";
import AppLayout from "./components/others/AppLayout";
import SettingAccount from "./pages/setting-account";
import AuthProtectedPage from "./components/others/AuthProtectedPage";
import AdminProtectedPage from "./components/others/AdminProtectedPage";
import ManageUsers from "./pages/admin/manage-users";
import ManagePosts from "./pages/admin/manage-posts";
import Dashboard from "./pages/admin/dashboard";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<AuthProtectedPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/account/me" element={<AccountMe />} />
          <Route path="/account/me/edit" element={<EditProfile />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/account/me/setting" element={<SettingAccount />} />
        </Route>

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/account/:id" element={<OtherAccount />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/explore" replace />} />

        <Route element={<AdminProtectedPage />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-posts" element={<ManagePosts />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
