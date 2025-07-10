import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: "admin",
  setUser: (user) => set({ user }),
}));
