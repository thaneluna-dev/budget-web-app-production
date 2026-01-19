import { Routes, Route } from "react-router-dom";
import SignInPage from "../Pages/SignInPage"
import SignUpPage from "../Pages/SignUpPage";
import { Dashboard } from "../components/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="https://budget-web-app-production.vercel.app/sign-in" element={<SignInPage />} />
      <Route path="/" element={<SignUpPage />} />
    </Routes>
  );
}