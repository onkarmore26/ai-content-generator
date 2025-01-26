"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Settings2,
  BookOpen,
  MessagesSquare,
  Search,
  TrendingUp,
  Star,
} from "lucide-react";

function LandingPageContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect_url") || "/dashboard"; // Fallback to dashboard

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
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "SEO Optimized",
      description: "Boost your online visibility with SEO-ready content.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "User Favorites",
      description: "Save and reuse your favorite templates.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Search",
      description: "Quickly find what you need with intelligent search tools.",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This app revolutionized how I create content. It's fast, easy, and delivers amazing results!",
      avatar: "/images/avatar1.jpg",
    },
    {
      name: "Jane Smith",
      feedback:
        "The templates are fantastic, and the customization options are exactly what I needed.",
      avatar: "/images/avatar2.jpg",
    },
    {
      name: "Carlos Martinez",
      feedback:
        "I can't imagine going back to manual content creation after using this tool.",
      avatar: "/images/avatar3.jpg",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gray-50 text-center">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 mt-16">
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
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="rounded-full bg-blue-600 p-3 text-white mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 w-full">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="italic text-gray-600 mb-4">
                "{testimonial.feedback}"
              </p>
              <h4 className="font-semibold text-lg">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 w-full">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join thousands of creators transforming their workflows with AI.
        </p>
        <Link href={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`}>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-md">
            Sign Up Now
          </button>
        </Link>
      </section>
    </main>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}
