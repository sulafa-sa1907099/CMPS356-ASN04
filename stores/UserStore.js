import { persist, devtools } from "zustand/middleware";

import create from 'zustand'

export const ideas = ((set) => ({
  user: "",
  setUser: (u) => set(() => ({ user: u })),
 
}));
export const userStore = create(devtools(persist(ideas, { name: "ideas" })));


