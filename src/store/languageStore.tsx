import {create} from 'zustand';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem('language') || 'fr', 
  setLanguage: (lang: string) => {
    localStorage.setItem('language', lang); 
    document.documentElement.lang = lang; 
    set({ language: lang });
  },
}));
