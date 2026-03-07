import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
export default function HomePage() {
  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => toast.success("Let's get started!")}
      >
        Get Started
      </button>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </>
  );
}
