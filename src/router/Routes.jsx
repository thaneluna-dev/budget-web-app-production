import { Routes, Route } from "react-router-dom";
import SignInPage from "../Pages/SignInPage"
import SignUpPage from "../Pages/SignUpPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="https://budget-web-app-production.vercel.app/sign-in" element={<SignInPage />} />
      <Route path="https://budget-web-app-production.vercel.app/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}