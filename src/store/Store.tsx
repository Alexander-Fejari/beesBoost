import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
  }

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  username: null,
  setToken: (token: string | null) => {
    let username = null;

    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      username = decoded.username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }

    set(() => ({
      token,
      isAuthenticated: !!token,
      username,
    }));
  },
}));

const storedToken = localStorage.getItem('token');

if (storedToken) {
  useAuthStore.getState().setToken(storedToken);
}
