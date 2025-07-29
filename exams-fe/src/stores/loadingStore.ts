import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  setLoading: (loading: boolean, message?: string) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingMessage: undefined,
  setLoading: (loading: boolean, message?: string) => 
    set({ isLoading: loading, loadingMessage: message }),
  startLoading: (message?: string) => 
    set({ isLoading: true, loadingMessage: message }),
  stopLoading: () => 
    set({ isLoading: false, loadingMessage: undefined }),
}));