import { create } from "zustand";

export const useRequestStore = create((set) => ({
  method: "GET",
  url: "",
  headers: "{}",
  body: "",
  loading: false,
  response: null,
  error: null,

  setField: (key, value) =>
    set({ [key]: value }),

  sendRequest: async () => {
    set({ loading: true, response: null, error: null });

    let headers;
    try {
      headers = JSON.parse(useRequestStore.getState().headers);
    } catch {
      set({ loading: false, error: "Invalid headers JSON" });
      return;
    }

    const payload = {
      method: useRequestStore.getState().method,
      url: useRequestStore.getState().url,
      headers,
      body: useRequestStore.getState().body
        ? JSON.parse(useRequestStore.getState().body)
        : null
    };

    try {
      const res = await fetch("http://localhost:4000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      set({ response: data, loading: false });
    } 
    catch {
        set({ error: "Request could not be completed", loading: false });
}

  }
}));
