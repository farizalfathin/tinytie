import { Route, Routes } from "react-router-dom";
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
import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset } from "./components/ui/sidebar";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import ProtectedPage from "./components/others/ProtectedPage";

function App() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <ScrollArea className="min-h-screen">
          <Routes>
            <Route element={<ProtectedPage />}>
              <Route path="/" element={<Home />} />
              <Route path="/account/me" element={<AccountMe />} />
              <Route path="/account/me/edit" element={<EditProfile />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/post/:id/edit" element={<EditPost />} />
              <Route path="/chat" element={<Chat />} />
            </Route>

            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/account/:id" element={<OtherAccount />} />
            <Route path="/post/:id" element={<DetailPost />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
          <ScrollBar />
        </ScrollArea>
      </SidebarInset>
    </>
  );
}

export default App;
