import {create} from 'zustand';
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    username: string;
    id: string; // Add userId to the DecodedToken interface
}

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    id: string | null; // Add userId to the AuthState interface
    setTokens: (accessToken: string | null, refreshToken: string | null) => void;
    renewToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    username: null,
    id: null, // Initialize userId in the state
    setTokens: (accessToken: string | null, refreshToken: string | null) => {
        let username = null;
        let id = null;
        if (accessToken) {
            const decoded: DecodedToken = jwtDecode<DecodedToken>(accessToken);
            username = decoded.username;
            id = decoded.id; // Extract userId from the decoded token
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken!);
        } else if (!refreshToken) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }

        set(() => ({
            accessToken,
            refreshToken,
            isAuthenticated: !!accessToken,
            username,
            id, // Update the state with userId
        }));
    },
    renewToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/renewToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken}),
        });

        if (!response.ok) {
            throw new Error('Failed to renew token');
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;

        set(() => ({
            accessToken: newAccessToken,
            isAuthenticated: !!newAccessToken,
        }));

        localStorage.setItem('accessToken', newAccessToken);
    },
}));

const storedAccessToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');

if (storedAccessToken && storedRefreshToken) {
    useAuthStore.getState().setTokens(storedAccessToken, storedRefreshToken);
}

// Function to handle fetching with token renewal logic
const fetchWithToken = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const {accessToken, renewToken} = useAuthStore.getState();
    let token = accessToken;
    if (token) {
        options.headers = {
            ...options.headers,
            authorization: `Bearer ${token}`,
        };
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        await renewToken();
        token = useAuthStore.getState().accessToken;
        localStorage.setItem('accessToken', token!);
        options.headers = {
            ...options.headers,
            authorization: `Bearer ${token}`,
        };
        response = await fetch(url, options);
    }

    return response;
};

export {fetchWithToken};
