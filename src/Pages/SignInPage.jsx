import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-4xl font-bold mb-10 text-green-600">
        Welcome to MoneyMate
      </h1>
      <SignIn
        appearance={{ theme: "simple" }}
        routing="virtual"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
