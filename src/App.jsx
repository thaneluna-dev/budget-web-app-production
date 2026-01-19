// App.jsx
import { useState } from "react";
import Navbar from "./components/NavBar";
import { Dashboard } from "./components/Dashboard";

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import AppRoutes from "./router/Routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  // Track the active tab in the parent
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentMode, setCurrentMode] = useState("sign-up");

  const fullUrl = window.location.href;
  return (
    <div className="min-h-screen bg-gray-500 p-4">
      <SignedOut>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SignedOut>
      <SignedIn>
        {isSignedIn ? (
          <>
            <Navbar />
            <Dashboard user={user.primaryEmailAddress.emailAddress} />
          </>
        ) : null}
      </SignedIn>
    </div>
  );
}
