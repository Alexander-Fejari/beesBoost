import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode'; // Ensure you import jwt-decode correctly

interface DecodedToken {
  username: string;
  id: string; // Add userId to the DecodedToken interface
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  id: string | null; // Add userId to the AuthState interface
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  username: null,
  id: null, // Initialize userId in the state
  setToken: (token: string | null) => {
    let username = null;
    let id = null;

    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      username = decoded.username;
      id = decoded.id; // Extract userId from the decoded token
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    set(() => ({
      token,
      isAuthenticated: !!token,
      username,
      id, // Update the state with userId
    }));
  },
}));

const storedToken = localStorage.getItem('token');

if (storedToken) {
  useAuthStore.getState().setToken(storedToken);
}
