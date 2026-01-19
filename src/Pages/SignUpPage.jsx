import SignInPage from "./SignInPage";
import { SignIn, SignInButton, SignUp } from "@clerk/clerk-react";
export default function SignUpPage({ setMode, currentMode}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-4xl font-bold mb-10 text-green-600">
        Welcome to MoneyMate
      </h1>
      <SignUp appearance={{ theme: "simple" }} routing="virtual" signInUrl="https://budget-web-app-production.vercel.app//sign-in" />
    </div>
  );
}
