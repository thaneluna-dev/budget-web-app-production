import { Routes, Route } from "react-router-dom";
import SignInPage from "../Pages/SignInPage"
import SignUpPage from "../Pages/SignUpPage";
import { Dashboard } from "../components/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/" element={<SignUpPage />} />
    </Routes>
  );
}