'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { getClientMessages, type ClientMessage } from '@/lib/api';

// Placeholder analytics data (simulating Vercel Analytics)
const analyticsData = {
  pageViews: {
    today: 1247,
    yesterday: 1189,
    change: 4.9,
  },
  uniqueVisitors: {
    today: 892,
    yesterday: 856,
    change: 4.2,
  },
  topPages: [
    { path: '/', views: 3421, unique: 2891 },
    { path: '/products', views: 2156, unique: 1892 },
    { path: '/about', views: 1234, unique: 1098 },
    { path: '/contact', views: 987, unique: 856 },
  ],
  topReferrers: [
    { source: 'google.com', visits: 1234 },
    { source: 'direct', visits: 892 },
    { source: 'twitter.com', visits: 456 },
    { source: 'linkedin.com', visits: 234 },
  ],
  topCountries: [
    { country: 'United States', visits: 3421 },
    { country: 'United Kingdom', visits: 1234 },
    { country: 'Canada', visits: 892 },
    { country: 'Germany', visits: 567 },
  ],
  topBrowsers: [
    { browser: 'Chrome', visits: 4567, percentage: 52.3 },
    { browser: 'Safari', visits: 2345, percentage: 26.8 },
    { browser: 'Firefox', visits: 1234, percentage: 14.1 },
    { browser: 'Edge', visits: 623, percentage: 7.1 },
  ],
};

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

    if (mounted) {
      fetchMessages();
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

          {/* Request Review Button */}
          <div className="mb-8">
            <button
              onClick={handleRequestReview}
              className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Client Review
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Page Views</p>
                  <p className="text-3xl font-semibold text-gray-900">{analyticsData.pageViews.today.toLocaleString()}</p>
                </div>
                <div className={`text-sm font-medium ${analyticsData.pageViews.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.pageViews.change > 0 ? '+' : ''}{analyticsData.pageViews.change}%
                </div>
              </div>
              <p className="text-sm text-gray-500">vs {analyticsData.pageViews.yesterday.toLocaleString()} yesterday</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Unique Visitors</p>
                  <p className="text-3xl font-semibold text-gray-900">{analyticsData.uniqueVisitors.today.toLocaleString()}</p>
                </div>
                <div className={`text-sm font-medium ${analyticsData.uniqueVisitors.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.uniqueVisitors.change > 0 ? '+' : ''}{analyticsData.uniqueVisitors.change}%
                </div>
              </div>
              <p className="text-sm text-gray-500">vs {analyticsData.uniqueVisitors.yesterday.toLocaleString()} yesterday</p>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Pages</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Page</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Unique</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topPages.map((page, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900 font-mono">{page.path}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right">{page.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right">{page.unique.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Top Referrers */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Referrers</h2>
              <div className="space-y-4">
                {analyticsData.topReferrers.map((referrer, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">{referrer.source}</span>
                    <span className="text-sm font-medium text-gray-700">{referrer.visits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Countries</h2>
              <div className="space-y-4">
                {analyticsData.topCountries.map((country, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">{country.country}</span>
                    <span className="text-sm font-medium text-gray-700">{country.visits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Browsers */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Browsers</h2>
            <div className="space-y-4">
              {analyticsData.topBrowsers.map((browser, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-900">{browser.browser}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {browser.visits.toLocaleString()} ({browser.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${browser.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
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

