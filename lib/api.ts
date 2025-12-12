import Cookies from 'js-cookie';

const BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:FYnzG7ev';
const TOKEN_KEY = 'xano_auth_token';

// Get token from cookies
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return Cookies.get(TOKEN_KEY) || null;
}

// Set token in cookies
export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days expiry
}

// Remove token from cookies
export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}

// Normalize header inputs into a mutable record
function normalizeHeaders(input?: HeadersInit): Record<string, string> {
  if (!input) return {};
  if (input instanceof Headers) {
    const obj: Record<string, string> = {};
    input.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  if (Array.isArray(input)) {
    return input.reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  }
  return { ...(input as Record<string, string>) };
}

// API request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...normalizeHeaders(options.headers),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Login
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  authToken: string;
  user?: any;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.authToken) {
    setToken(response.authToken);
  }

  return response;
}

// Signup
export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.authToken) {
    setToken(response.authToken);
  }

  return response;
}

// Get current user
export async function getCurrentUser(): Promise<any> {
  return apiRequest<any>('/auth/me', {
    method: 'GET',
  });
}

// Logout
export function logout(): void {
  removeToken();
}

// Client Messages
const CLIENT_MESSAGE_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:PtZzK0Pv';

export interface ClientMessage {
  id: number;
  message: string;
}

export async function getClientMessages(): Promise<ClientMessage[]> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${CLIENT_MESSAGE_BASE_URL}/client_message`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Analytics
const ANALYTICS_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:noTfiLGv';

export interface TopReferrer {
  ref: string;
  count: number;
}

export interface AnalyticsData {
  unique_visits: number;
  views_pr_page: Record<string, number>;
  top_referers: TopReferrer[];
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${ANALYTICS_BASE_URL}/event`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Bad Reviews
const BAD_REVIEWS_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:U0lx3VKt';

export interface BadReview {
  starts?: number;
  stars?: number; // Handle both field names
  message: string;
  created_at: string;
}

export async function getBadReviews(): Promise<BadReview[]> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BAD_REVIEWS_BASE_URL}/bad_reviews`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Stripe Checkout
const STRIPE_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:TLCFxgq6';

export interface StripeCheckoutResponse {
  url?: string;
  checkoutUrl?: string;
  sessionId?: string;
  [key: string]: any;
}

export async function createStripeCheckoutSession(): Promise<StripeCheckoutResponse | string> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${STRIPE_BASE_URL}/stripe/create-checkout-session`, {
    method: 'POST',
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  // Check content type to handle both JSON and plain text responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    // If it's not JSON, return as text (might be the URL directly)
    return response.text();
  }
}

// Contact Form
const CONTACT_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:Cm6IdgwM';

export interface ContactFormData {
  name: string;
  email: string;
  product: string;
  message: string;
}

export interface ContactResponse {
  http_response: number;
}

export async function sendMail(data: ContactFormData): Promise<ContactResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${CONTACT_BASE_URL}/send_mail`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

