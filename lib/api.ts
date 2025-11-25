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

// API request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
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
  const headers: HeadersInit = {
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

