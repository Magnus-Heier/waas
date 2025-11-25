'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { user, loading: userLoading } = useUser();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only check authentication after component has mounted to avoid hydration mismatch
  const authenticated = mounted && isAuthenticated();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-semibold text-gray-900">
                YourBrand
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {!mounted ? (
                // Show default state during SSR to match initial client render
                <>
                  <Link
                    href="/login"
                    className="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : authenticated ? (
                <>
                  {!userLoading && user && (
                    <span className="text-base text-gray-700">
                      {user.name || user.email || 'User'}
                    </span>
                  )}
                  <button
                    onClick={logout}
                    className="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 mb-8 leading-tight">
              Build Something Amazing
            </h1>
            <p className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              The best solution for your needs. Faster, cheaper, and more reliable than the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {mounted && authenticated ? (
                <Link
                  href="/dashboard"
                  className="px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Get Started Free
                </Link>
              )}
              <button className="px-10 py-5 text-lg font-medium text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-2xl text-gray-700">
              See our solution in action
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {/* Video Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium text-lg">Video Placeholder</p>
                  <p className="text-base text-gray-600 mt-2">Replace with your "How It Works" video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-2xl text-gray-700">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-10 sm:p-14 border border-gray-200">
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-base font-medium text-gray-900 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 resize-none"
                  placeholder="Tell us more..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-base">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
