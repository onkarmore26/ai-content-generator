"use client";

import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { useSearchParams } from "next/navigation"; // Handle search params
import { useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the redirect URL from search params or default to "/dashboard"
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectUrl); // Redirect authenticated users
    }
  }, [isSignedIn, isLoaded, router, redirectUrl]);

  if (!isLoaded) {
    // Loading state while Clerk determines the user's status
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
