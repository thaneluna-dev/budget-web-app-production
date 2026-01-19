import { Routes, Route } from "react-router-dom";
import SignInPage from "../Pages/SignInPage"
import SignUpPage from "../Pages/SignUpPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}