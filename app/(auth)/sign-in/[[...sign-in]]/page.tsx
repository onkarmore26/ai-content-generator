"use client";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation"; // Import for handling query params

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Use search params hook to retrieve redirect_url from query string
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"; // Fallback to '/dashboard'

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
