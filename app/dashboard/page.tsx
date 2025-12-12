'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { getClientMessages, type ClientMessage, getAnalytics, type AnalyticsData, getBadReviews, type BadReview, createStripeCheckoutSession } from '@/lib/api';

// Helper function to process message and convert escaped newlines to actual newlines
// Also normalizes excessive consecutive newlines (more than 2) to maximum 2
function processMessage(message: string): string {
  return message
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\')
    .replace(/\n{3,}/g, '\n\n'); // Replace 3+ consecutive newlines with max 2
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [clientMessages, setClientMessages] = useState<ClientMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [badReviews, setBadReviews] = useState<BadReview[]>([]);
  const [loadingBadReviews, setLoadingBadReviews] = useState(false);
  const [badReviewsError, setBadReviewsError] = useState<string | null>(null);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const { logout } = useAuth();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoadingMessages(true);
      setError(null);
      try {
        const messages = await getClientMessages();
        // Process messages to convert escaped newlines to actual newlines
        const processedMessages = messages.map(msg => ({
          ...msg,
          message: processMessage(msg.message)
        }));
        setClientMessages(processedMessages);
        if (processedMessages.length > 0) {
          setSelectedMessage(processedMessages[0]);
          setEditedMessage(processedMessages[0].message);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoadingMessages(false);
      }
    };

    const fetchAnalytics = async () => {
      setLoadingAnalytics(true);
      setAnalyticsError(null);
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err: any) {
        setAnalyticsError(err.message || 'Failed to load analytics');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    const fetchBadReviews = async () => {
      setLoadingBadReviews(true);
      setBadReviewsError(null);
      try {
        const reviews = await getBadReviews();
        console.log('Bad reviews data:', reviews);
        if (reviews && reviews.length > 0) {
          console.log('First review sample:', reviews[0]);
        }
        setBadReviews(reviews);
      } catch (err: any) {
        setBadReviewsError(err.message || 'Failed to load bad reviews');
        console.error('Error fetching bad reviews:', err);
      } finally {
        setLoadingBadReviews(false);
      }
    };

    if (mounted) {
      fetchMessages();
      fetchAnalytics();
      fetchBadReviews();
    }
  }, [mounted]);

  // Update edited message when a different message is selected
  useEffect(() => {
    if (selectedMessage) {
      setEditedMessage(selectedMessage.message);
    }
  }, [selectedMessage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showReviewModal]);

  const handleRequestReview = () => {
    setShowReviewModal(true);
    // In a real implementation, this would send a request to your backend
    // or trigger an email/notification to the client
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    // Reset edited message to selected message when closing
    if (selectedMessage) {
      setEditedMessage(selectedMessage.message);
    }
  };

  const handlePayWithStripe = async () => {
    setLoadingStripe(true);
    try {
      const response = await createStripeCheckoutSession();
      console.log('Stripe checkout response:', response);
      
      // Check if the response itself is a string (the URL)
      let checkoutUrl: string | null = null;
      
      if (typeof response === 'string') {
        checkoutUrl = response;
      } else {
        // Try multiple possible field names for the checkout URL
        checkoutUrl = 
          response.url || 
          response.checkoutUrl || 
          response.checkout_url || 
          response.sessionUrl || 
          response.session_url ||
          null;
      }
      
      if (checkoutUrl && typeof checkoutUrl === 'string') {
        window.location.href = checkoutUrl;
      } else {
        console.error('Response structure:', response);
        throw new Error('No checkout URL received from server. Check console for response details.');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create checkout session');
      console.error('Error creating Stripe checkout session:', err);
    } finally {
      setLoadingStripe(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-semibold text-gray-900">
                YourBrand
              </Link>
              <Link href="/dashboard" className="text-base font-medium text-gray-900">
                Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-6">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-lg text-gray-600">Vercel Analytics Overview</p>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={handleRequestReview}
              className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Client Review
            </button>
            <button
              onClick={handlePayWithStripe}
              disabled={loadingStripe}
              className="px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingStripe ? 'Loading...' : 'Pay with Stripe'}
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Unique Visits</p>
                  {loadingAnalytics ? (
                    <p className="text-3xl font-semibold text-gray-400">Loading...</p>
                  ) : analyticsError ? (
                    <p className="text-sm text-red-600">{analyticsError}</p>
                  ) : (
                    <p className="text-3xl font-semibold text-gray-900">
                      {analytics?.unique_visits?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">Total unique visitors</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Page Views</p>
                  {loadingAnalytics ? (
                    <p className="text-3xl font-semibold text-gray-400">Loading...</p>
                  ) : analyticsError ? (
                    <p className="text-sm text-red-600">{analyticsError}</p>
                  ) : (
                    <p className="text-3xl font-semibold text-gray-900">
                      {analytics?.views_pr_page 
                        ? Object.values(analytics.views_pr_page).reduce((sum, views) => sum + views, 0).toLocaleString()
                        : 0}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">Across all pages</p>
            </div>
          </div>

          {/* Views Per Page - Horizontal Bar Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Views Per Page</h2>
            {loadingAnalytics ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading analytics...</p>
              </div>
            ) : analyticsError ? (
              <div className="text-center py-12">
                <p className="text-red-600">{analyticsError}</p>
              </div>
            ) : !analytics?.views_pr_page || Object.keys(analytics.views_pr_page).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No page view data available</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(analytics.views_pr_page)
                  .sort(([, a], [, b]) => b - a)
                  .map(([page, views]) => {
                    const maxViews = Math.max(...Object.values(analytics.views_pr_page));
                    const percentage = maxViews > 0 ? (views / maxViews) * 100 : 0;
                    
                    return (
                      <div key={page} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900 font-mono">
                            {page || '/'}
                          </span>
                          <span className="text-sm font-semibold text-gray-700">
                            {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
                          </span>
                        </div>
                        <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-500 ease-out shadow-sm"
                            style={{ width: `${percentage}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Referrers</h2>
            {loadingAnalytics ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading analytics...</p>
              </div>
            ) : analyticsError ? (
              <div className="text-center py-12">
                <p className="text-red-600">{analyticsError}</p>
              </div>
            ) : !analytics?.top_referers || analytics.top_referers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No referrer data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.top_referers
                  .sort((a, b) => b.count - a.count)
                  .map((referrer, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-900 break-all pr-4">{referrer.ref}</span>
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {referrer.count.toLocaleString()} {referrer.count === 1 ? 'visit' : 'visits'}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Bad Reviews */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Bad Reviews</h2>
            {loadingBadReviews ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading bad reviews...</p>
              </div>
            ) : badReviewsError ? (
              <div className="text-center py-12">
                <p className="text-red-600">{badReviewsError}</p>
              </div>
            ) : badReviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No bad reviews available</p>
              </div>
            ) : (
              <div className="space-y-6">
                {badReviews.map((review, index) => {
                  const date = new Date(review.created_at);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  // Handle both "starts" and "stars" field names, and ensure it's a number
                  const starRating = Number((review as any).stars ?? (review as any).starts ?? 0);
                  const validStarRating = Math.max(0, Math.min(5, starRating)); // Clamp between 0-5

                  return (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const starValue = i + 1;
                              const isFilled = starValue <= validStarRating;
                              return (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${
                                    isFilled ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              );
                            })}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {validStarRating} {validStarRating === 1 ? 'star' : 'stars'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{formattedDate}</span>
                      </div>
                      <p className="text-base text-gray-900 whitespace-pre-wrap">{review.message}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send Message to Client</h2>
            
            {loadingMessages ? (
              <p className="text-gray-600 mb-6">Loading messages...</p>
            ) : error ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            ) : clientMessages.length === 0 ? (
              <p className="text-gray-600 mb-6">No messages available.</p>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select a message:
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                    {clientMessages.map((message) => (
                      <button
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`w-full text-left p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                          selectedMessage?.id === message.id
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                          {message.message}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMessage && (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Edit your message:
                      </label>
                      <textarea
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg text-sm text-gray-700 font-mono resize-y min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Edit your message here..."
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        You can edit the selected message before sending it to your client.
                      </p>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleCloseReviewModal}
                    className="flex-1 px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (editedMessage.trim()) {
                        // In a real implementation, this would send the message to the client
                        alert(`Message sent to client!\n\n${editedMessage}`);
                        handleCloseReviewModal();
                      }
                    }}
                    disabled={!editedMessage.trim()}
                    className="flex-1 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

