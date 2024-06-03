import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchWithToken } from "@/store/Store";

interface SearchResult {
    type: string;
    results: never[];
}

interface SearchState {
    keyword: string;
    searchResults: SearchResult[];
    isLoading: boolean;
    errorMessage: string | null;
    setKeyword: (keyword: string) => void;
    performSearch: (keyword: string, token: string) => Promise<void>;
}

const useSearchStore = create<SearchState>()(devtools((set, get) => ({
    keyword: '',
    searchResults: [],
    isLoading: false,
    errorMessage: null,
    setKeyword: (keyword: string) => set({ keyword }),
    performSearch: async (keyword: string) => {
        set({ isLoading: true, searchResults: [], errorMessage: null });

        const API_URLS = {
            users: `${import.meta.env.VITE_APP_API_URL}/user/getAllUsers`,
            offers: `${import.meta.env.VITE_APP_API_URL}/post/getPosts`
        };

        const searchResults: SearchResult[] = [];

        const requests = Object.keys(API_URLS).map(async (key) => {
            try {
                const response = await fetchWithToken(API_URLS[key], {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                // Filtrer les résultats par mot clé
                const filteredResults = data.filter((item: any) =>
                    JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase())
                );

                searchResults.push({ type: key, results: filteredResults });
            } catch (error) {
                console.error(`Erreur lors de la récupération des données de ${key}:`, error);
            }
        });

        await Promise.all(requests);
        set({ searchResults, isLoading: false });
    },
})));

export default useSearchStore;
