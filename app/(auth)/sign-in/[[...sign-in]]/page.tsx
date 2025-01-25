"use client";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Get the redirect URL from query parameters, fallback to '/dashboard' if not present
  const redirectUrl =
    new URLSearchParams(window.location.search).get("redirect_url") ||
    "/dashboard";

  useEffect(() => {
    // Redirect if the user is signed in and data is loaded
    if (isLoaded && isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isSignedIn, isLoaded, router, redirectUrl]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
