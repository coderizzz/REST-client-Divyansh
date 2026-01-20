import { create } from "zustand";

export const useHistoryStore = create((set) => ({
  items: [],
  total: 0,
  limit: 5,
  offset: 0,
  loading: false,

  fetchHistory: async (offset = 0) => {
    set({ loading: true });

    const res = await fetch(
      `http://localhost:4000/requests?limit=4&offset=${offset}`
    );

    const data = await res.json();

    set({
      items: data.data,
      total: data.total,
      offset: data.offset,
      loading: false
    });
  }
}));
