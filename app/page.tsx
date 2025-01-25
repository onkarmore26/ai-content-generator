"use client";

import { useSearchParams } from "next/navigation"; // Handle search params
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Settings2,
  BookOpen,
  MessagesSquare,
} from "lucide-react";

export default function LandingPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"; // Fallback to "/dashboard"

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "25+ Templates",
      description: "Get started with pre-designed templates for your needs.",
    },
    {
      icon: <Settings2 className="h-6 w-6" />,
      title: "Customizable",
      description: "Tailor content generation to your exact requirements.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Free to Use",
      description: "Start creating with no upfront cost.",
    },
    {
      icon: <MessagesSquare className="h-6 w-6" />,
      title: "24/7 Support",
      description: "We're here to help anytime you need us.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gray-50 text-center">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          AI Content{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Generator
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
          Revolutionize your content creation with our AI-powered app,
          delivering engaging and high-quality text in seconds.
        </p>
        <Link href={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`}>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg flex items-center">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm"
          >
            <div className="rounded-full bg-blue-600 p-3 text-white mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
